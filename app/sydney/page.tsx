import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import { genericSlides } from "@/app/constants/slides";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={genericSlides}
      initialTitle="Sydney V0 Slides"
    />
  );
}
