import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import { sydneySlides, sydneySlidesTitle } from "@/app/constants/sydney-slides";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={sydneySlides}
      initialTitle={sydneySlidesTitle}
    />
  );
}
