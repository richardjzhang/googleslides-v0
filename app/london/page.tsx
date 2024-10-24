import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import {
  londonSlides,
  londonSlidesTitle,
  londonProfilePic,
} from "@/app/constants/london-slides";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={londonSlides}
      initialTitle={londonSlidesTitle}
      profilePic={londonProfilePic}
      fullScreenImageQuality={75}
    />
  );
}
