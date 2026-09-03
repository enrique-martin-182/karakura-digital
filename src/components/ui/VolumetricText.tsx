// Shadow Play — Originkit
"use client"
import * as React from "react"
import {
    useEffect,
    useLayoutEffect,
    useCallback,
    useRef,
    type CSSProperties,
} from "react"

const useIsStaticRenderer = () => false

type Align = "left" | "center" | "right"

interface VolumetricTextProps {
    text?: string
    font?: CSSProperties
    textColor?: string
    backgroundColor?: string
    shadowColor?: string
    fitToWidth?: boolean
    fitPadding?: number
    align?: Align
    lightX?: number
    lightY?: number
    followEase?: number
    lightSize?: number
    lightFalloff?: number
    shadowStrength?: number
    rainbow?: number
    dither?: number
    samples?: number
    quality?: number
    style?: CSSProperties
}

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAG = (samples: number) => `
precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D src;
uniform vec3 textColor;
uniform vec3 bgColor;
uniform float lightSize;
uniform float lightFalloff;
uniform float shadowStrength;
uniform float rainbow;
uniform float dither;
uniform vec3 shadowColor;
uniform float lightActive;

#define PI 3.141593
#define SAMPLES ${samples.toFixed(1)}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(489., 589.))) * 492.) * 2. - 1.;
}
float hash(vec3 p) {
  return fract(sin(dot(p, vec3(489., 589., 58.))) * 492.) * 2. - 1.;
}
vec2 hash2(vec3 p) {
  return vec2(hash(p), hash(p + 1.));
}
vec4 readTex(vec2 uv) {
  if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) { return vec4(0); }
  return texture2D(src, uv);
}
vec3 spectrum(float x) {
  return cos((x - vec3(0, .5, 1)) * vec3(.6, 1., .5) * PI);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float mask = readTex(uv).r;
  if (mask > 0.995) {
    gl_FragColor = vec4(textColor, 1.0);
    return;
  }

  vec2 p = uv * 2. - 1.;
  p.x *= resolution.x / resolution.y;

  vec2 mp = mouse / resolution;
  mp = mp * 2. - 1.;
  mp.x *= resolution.x / resolution.y;

  vec2 rp = p;
  vec2 d = (mp - p) / SAMPLES;
  float acc = 0.;
  for (float i = 0.; i < SAMPLES; i++) {
    rp += d;
    rp += hash2(vec3(rp, i)) * 0.5 / SAMPLES;

    vec2 uv2 = rp;
    uv2.x /= resolution.x / resolution.y;
    uv2 = uv2 * 0.5 + 0.5;
    acc += readTex(uv2).r / SAMPLES;
  }

  float lm = length(p - mp);
  float falloff = smoothstep(0., 1., pow(lightSize / lm, lightFalloff));
  float shade = acc * shadowStrength * falloff * lightActive;
  vec3 rainbowCol = spectrum(cos(acc * 3.5)) * acc * rainbow * falloff * lightActive;

  vec3 c = shadowColor * shade + rainbowCol;
  c -= hash(vec3(uv.xyy)) * dither;

  float a = clamp(shade + acc * rainbow * falloff * lightActive, 0.0, 1.0);
  vec3 col = mix(bgColor, clamp(c, 0.0, 1.0), a);
  gl_FragColor = vec4(mix(col, textColor, mask), 1.0);
}
`

let probeCtx: CanvasRenderingContext2D | null = null
function parseColor(css: string, fallback: [number, number, number]): [number, number, number] {
    if (typeof document === "undefined") return fallback
    if (!probeCtx) {
        const cv = document.createElement("canvas")
        cv.width = 1
        cv.height = 1
        probeCtx = cv.getContext("2d", { willReadFrequently: true })
    }
    if (!probeCtx) return fallback
    try {
        probeCtx.clearRect(0, 0, 1, 1)
        probeCtx.fillStyle = "#000"
        probeCtx.fillStyle = css
        probeCtx.fillRect(0, 0, 1, 1)
        const d = probeCtx.getImageData(0, 0, 1, 1).data
        return [d[0] / 255, d[1] / 255, d[2] / 255]
    } catch {
        return fallback
    }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(/\s+/).filter(Boolean)
    if (words.length === 0) return [text]
    const lines: string[] = []
    let current = ""

    const place = (word: string) => {
        if (current === "") {
            if (ctx.measureText(word).width <= maxWidth) { current = word; return }
            let chunk = ""
            for (const ch of Array.from(word)) {
                if (chunk && ctx.measureText(chunk + ch).width > maxWidth) { lines.push(chunk); chunk = ch }
                else chunk += ch
            }
            current = chunk
            return
        }
        if (ctx.measureText(`${current} ${word}`).width <= maxWidth) {
            current = `${current} ${word}`
        } else {
            lines.push(current)
            current = ""
            place(word)
        }
    }

    for (const word of words) place(word)
    if (current !== "") lines.push(current)
    return lines.length ? lines : [text]
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
    const sh = gl.createShader(type)
    if (!sh) return null
    gl.shaderSource(sh, source)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { gl.deleteShader(sh); return null }
    return sh
}

function buildProgram(gl: WebGLRenderingContext, samples: number) {
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG(samples))
    if (!vs || !fs) return null
    const prog = gl.createProgram()
    if (!prog) return null
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { gl.deleteProgram(prog); return null }
    return prog
}

function VolumetricTextBase(props: VolumetricTextProps) {
    const {
        text = "Thru.",
        font = { fontFamily: "Inter, system-ui, sans-serif", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em" } as CSSProperties,
        textColor = "#ffffff",
        backgroundColor = "#000000",
        shadowColor = "#000000",
        fitToWidth = true,
        fitPadding = 8,
        align = "center",
        lightX = 50,
        lightY = 30,
        followEase = 12,
        lightSize = 10,
        lightFalloff = 60,
        shadowStrength = 100,
        rainbow = 250,
        dither = 1,
        samples = 64,
        quality = 100,
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const rootRef = useRef<HTMLDivElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const glRef = useRef<WebGLRenderingContext | null>(null)
    const progRef = useRef<WebGLProgram | null>(null)
    const texRef = useRef<WebGLTexture | null>(null)
    const bufRef = useRef<WebGLBuffer | null>(null)
    const maskRef = useRef<HTMLCanvasElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
    const targetRef = useRef({ x: 0, y: 0 })
    const lightRef = useRef({ x: 0, y: 0 })
    const pointerSeenRef = useRef(false)
    const propsRef = useRef<VolumetricTextProps>({})
    propsRef.current = { text, font, textColor, backgroundColor, shadowColor, fitToWidth, fitPadding, align, lightX, lightY, followEase, lightSize, lightFalloff, shadowStrength, rainbow, dither, quality }

    const drawMask = useCallback(() => {
        const { w, h, dpr } = sizeRef.current
        if (w <= 0 || h <= 0) return
        let cv = maskRef.current
        if (!cv) { cv = document.createElement("canvas"); maskRef.current = cv }
        const p = propsRef.current
        cv.width = Math.max(1, Math.round(w * dpr))
        cv.height = Math.max(1, Math.round(h * dpr))
        const ctx = cv.getContext("2d")
        if (!ctx) return
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, w, h)

        const f = (p.font || {}) as CSSProperties & Record<string, unknown>
        const family = (f.fontFamily as string) || "Inter, system-ui, sans-serif"
        const weight = (f.fontWeight as string | number) || 900
        const styleStr = (f.fontStyle as string) || "normal"
        const lineHeight = (() => {
            const lh = f.lineHeight
            if (typeof lh === "number") return lh
            if (typeof lh === "string") {
                const v = parseFloat(lh)
                if (isNaN(v)) return 1
                if (lh.endsWith("%")) return v / 100
                if (lh.endsWith("em")) return v
                return /[a-z]/i.test(lh) ? 1 : v
            }
            return 1
        })()

        const REFERENCE_WIDTH = 900
        const MIN_FONT_SIZE = 10
        const baseSize = (() => {
            const fs = f.fontSize
            const scale = Math.max(w, 1) / REFERENCE_WIDTH
            if (typeof fs === "number") return Math.max(MIN_FONT_SIZE, fs * scale)
            if (typeof fs === "string") {
                const v = parseFloat(fs)
                if (!isNaN(v)) return Math.max(MIN_FONT_SIZE, v * scale)
            }
            return Math.max(MIN_FONT_SIZE, h * 0.4)
        })()

        const fontStr = (size: number) => `${styleStr} ${weight} ${size}px ${family}`
        const ls = f.letterSpacing
        const applyFont = (size: number) => {
            ctx.font = fontStr(size)
            if (typeof ls === "string" && "letterSpacing" in ctx) {
                try {
                    ;(ctx as unknown as Record<string, string>).letterSpacing = ls.endsWith("em") ? `${parseFloat(ls) * size}px` : ls
                    ctx.font = fontStr(size)
                } catch { /* unsupported */ }
            }
        }

        const hardLines = String(p.text ?? "").split("\n")
        const inset = Math.max(0, Math.min(45, p.fitPadding ?? 8)) / 50
        const availW = Math.max(1, w * (1 - inset))
        const availH = Math.max(1, h * (1 - inset))

        const layout = (size: number, maxWidth: number) => {
            applyFont(size)
            const wrapped = hardLines.flatMap((l) => wrapText(ctx, l, maxWidth))
            let widest = 0
            for (const l of wrapped) { const lw = ctx.measureText(l).width; if (lw > widest) widest = lw }
            return { wrapped, widest, height: size * lineHeight * wrapped.length }
        }

        let size = baseSize
        if (p.fitToWidth) {
            const fits = (s: number) => { const l = layout(s, availW); return l.widest <= availW && l.height <= availH }
            let lo = MIN_FONT_SIZE
            let hi = Math.max(MIN_FONT_SIZE + 1, availH / Math.max(0.1, lineHeight))
            if (fits(hi)) { lo = hi } else {
                for (let i = 0; i < 22; i++) { const mid = (lo + hi) / 2; if (fits(mid)) lo = mid; else hi = mid }
            }
            size = Math.max(MIN_FONT_SIZE, lo)
        }

        const { wrapped } = layout(size, availW)
        ctx.fillStyle = "#ffffff"
        ctx.textBaseline = "middle"
        ctx.textAlign = p.align === "left" ? "left" : p.align === "right" ? "right" : "center"
        const boxLeft = (w - availW) / 2
        const x = p.align === "left" ? boxLeft : p.align === "right" ? boxLeft + availW : w / 2
        const lh = size * lineHeight
        const total = lh * wrapped.length
        for (let i = 0; i < wrapped.length; i++) {
            ctx.fillText(wrapped[i], x, h / 2 - total / 2 + lh * (i + 0.5))
        }

        const gl = glRef.current
        const tex = texRef.current
        if (gl && tex) {
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cv)
        }
    }, [])

    const resize = useCallback(() => {
        const root = rootRef.current
        const canvas = canvasRef.current
        const gl = glRef.current
        if (!root || !canvas || !gl) return
        const rect = root.getBoundingClientRect()
        const w = Math.max(1, Math.round(rect.width))
        const h = Math.max(1, Math.round(rect.height))
        const q = Math.max(25, Math.min(100, propsRef.current.quality ?? 100)) / 100
        const dpr = Math.min((typeof window !== "undefined" && window.devicePixelRatio) || 1, 2) * q
        sizeRef.current = { w, h, dpr }
        canvas.width = Math.max(1, Math.round(w * dpr))
        canvas.height = Math.max(1, Math.round(h * dpr))
        gl.viewport(0, 0, canvas.width, canvas.height)
        drawMask()
    }, [drawMask])

    const render = useCallback(() => {
        const gl = glRef.current
        const prog = progRef.current
        const canvas = canvasRef.current
        if (!gl || !prog || !canvas) return
        const p = propsRef.current
        const { w, h } = sizeRef.current

        const k = Math.max(1, Math.min(100, p.followEase ?? 12)) / 100
        const L = lightRef.current
        L.x += (targetRef.current.x - L.x) * k
        L.y += (targetRef.current.y - L.y) * k

        const tc = parseColor(p.textColor ?? "#fff", [1, 1, 1])
        const bc = parseColor(p.backgroundColor ?? "#000", [0, 0, 0])
        const sc = parseColor(p.shadowColor ?? "#000", [0, 0, 0])
        const lightActive = pointerSeenRef.current ? 1 : 0

        gl.useProgram(prog)
        const u = (name: string) => gl.getUniformLocation(prog, name)
        gl.uniform2f(u("resolution"), canvas.width, canvas.height)
        const sx = canvas.width / Math.max(1, w)
        const sy = canvas.height / Math.max(1, h)
        gl.uniform2f(u("mouse"), L.x * sx, L.y * sy)
        gl.uniform3f(u("textColor"), tc[0], tc[1], tc[2])
        gl.uniform3f(u("bgColor"), bc[0], bc[1], bc[2])
        gl.uniform3f(u("shadowColor"), sc[0], sc[1], sc[2])
        gl.uniform1f(u("lightActive"), lightActive)
        gl.uniform1f(u("lightSize"), Math.max(0.001, (p.lightSize ?? 10) / 100))
        gl.uniform1f(u("lightFalloff"), Math.max(0.01, (p.lightFalloff ?? 60) / 100))
        gl.uniform1f(u("shadowStrength"), (p.shadowStrength ?? 100) / 100)
        gl.uniform1f(u("rainbow"), (p.rainbow ?? 250) / 100)
        gl.uniform1f(u("dither"), (p.dither ?? 1) / 100)
        gl.uniform1i(u("src"), 0)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texRef.current)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }, [])

    useLayoutEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl = (canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true }) as WebGLRenderingContext | null) ||
            (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)
        if (!gl) return
        glRef.current = gl

        const prog = buildProgram(gl, Math.max(4, Math.min(160, Math.round(samples))))
        if (!prog) return
        progRef.current = prog

        const buf = gl.createBuffer()
        bufRef.current = buf
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, "position")
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

        const tex = gl.createTexture()
        texRef.current = tex
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        return () => {
            if (progRef.current) gl.deleteProgram(progRef.current)
            if (bufRef.current) gl.deleteBuffer(bufRef.current)
            if (texRef.current) gl.deleteTexture(texRef.current)
            progRef.current = null; bufRef.current = null; texRef.current = null; glRef.current = null
        }
    }, [samples])

    useLayoutEffect(() => {
        resize()
        const root = rootRef.current
        if (!root || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver(() => resize())
        ro.observe(root)
        return () => ro.disconnect()
    }, [resize])

    useEffect(() => { drawMask() }, [text, font, fitToWidth, fitPadding, align, drawMask])

    useEffect(() => {
        const fonts = (document as unknown as { fonts?: { ready?: Promise<void> } }).fonts
        if (!fonts?.ready) return
        let cancelled = false
        fonts.ready.then(() => { if (!cancelled) drawMask() })
        return () => { cancelled = true }
    }, [drawMask])

    useEffect(() => {
        if (isStatic) return
        const root = rootRef.current
        if (!root) return
        const onMove = (e: PointerEvent) => {
            const r = root.getBoundingClientRect()
            pointerSeenRef.current = true
            targetRef.current = { x: e.clientX - r.left, y: r.height - (e.clientY - r.top) }
        }
        const onLeave = () => { pointerSeenRef.current = false }
        root.addEventListener("pointermove", onMove)
        root.addEventListener("pointerleave", onLeave)
        return () => { root.removeEventListener("pointermove", onMove); root.removeEventListener("pointerleave", onLeave) }
    }, [isStatic])

    useEffect(() => {
        const { w, h } = sizeRef.current
        lightRef.current = { x: (lightX / 100) * w, y: (1 - lightY / 100) * h }
        targetRef.current = { ...lightRef.current }
        if (isStatic) { render(); return }

        const startLoop = () => {
            if (rafRef.current) return
            const tick = () => {
                render()
                rafRef.current = requestAnimationFrame(tick)
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        const stopLoop = () => {
            if (rafRef.current != null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
        }

        if (typeof IntersectionObserver !== "undefined") {
            const root = rootRef.current
            const io = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) startLoop(); else stopLoop() },
                { threshold: 0 }
            )
            if (root) {
                io.observe(root)
                // Don't start until IO fires — avoids running while off-screen on mount
                return () => { io.disconnect(); stopLoop() }
            }
        }

        startLoop()
        return () => stopLoop()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatic, render, samples])

    return (
        <div
            ref={rootRef}
            style={{ ...(style || {}), position: "relative", width: "100%", height: "100%", minWidth: 80, minHeight: 60, overflow: "hidden", background: backgroundColor }}
        >
            <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
            <span style={{ position: "absolute", width: 1, height: 1, margin: -1, padding: 0, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>
                {text}
            </span>
        </div>
    )
}

const PRESET = {
    text: "KARAKURA DIGITAL",
    font: {
        fontFamily: "Plus Jakarta Sans, Inter, system-ui, sans-serif",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "-0.03em",
    } as CSSProperties,
    textColor: "#4edea3",
    backgroundColor: "#001711",
    shadowColor: "#001711",
    shadowStrength: 120,
    rainbow: 200,
    lightSize: 12,
    lightFalloff: 55,
    samples: 48,
    quality: 75,
}

export default function VolumetricText(props: Partial<VolumetricTextProps>) {
    return <VolumetricTextBase {...PRESET} {...props} />
}
