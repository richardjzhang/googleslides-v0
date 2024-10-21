import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import { sydneySlides } from "@/app/constants/sydney-slides";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={sydneySlides}
      initialTitle="Sydney V0 Presentation"
    />
  );
}
