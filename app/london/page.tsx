import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import { londonSlides } from "@/app/constants/london-slides";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={londonSlides}
      initialTitle="London V0 Presentation"
    />
  );
}
