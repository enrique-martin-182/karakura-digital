"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("localeSwitcher");

  const rawPath = pathname.startsWith("/en")
    ? pathname.slice(3) || "/"
    : pathname;

  const switchLocale = locale === "es" ? "en" : "es";
  const switchHref = switchLocale === "en" ? `/en${rawPath}` : rawPath;

  return (
    <Link
      href={switchHref}
      className="text-xs font-mono font-semibold px-2 py-1 rounded border border-outline-variant/25 text-on-surface-variant hover:text-white hover:border-outline-variant/50 transition-all select-none"
      aria-label={t("label")}
    >
      {switchLocale.toUpperCase()}
    </Link>
  );
}
