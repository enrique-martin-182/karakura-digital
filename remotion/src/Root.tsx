import { Composition } from "remotion";
import { HeroBackground } from "./HeroBackground";
import { GapBackground } from "./GapBackground";
import { ServicesBackground } from "./ServicesBackground";
import { ProcessBackground } from "./ProcessBackground";
import { ResultsBackground } from "./ResultsBackground";
import { TestimonialsBackground } from "./TestimonialsBackground";
import { ContactBackground } from "./ContactBackground";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroBackground"
        component={HeroBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="GapBackground"
        component={GapBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ServicesBackground"
        component={ServicesBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProcessBackground"
        component={ProcessBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ResultsBackground"
        component={ResultsBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TestimonialsBackground"
        component={TestimonialsBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ContactBackground"
        component={ContactBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
