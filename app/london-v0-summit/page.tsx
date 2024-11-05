import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import {
  londonV0SummitSlides,
  londonV0SummitSlidesTitle,
  londonV0SummitProfilePic,
} from "@/app/constants/london-v0-summit";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={londonV0SummitSlides}
      initialTitle={londonV0SummitSlidesTitle}
      profilePic={londonV0SummitProfilePic}
      fullScreenImageQuality={75}
    />
  );
}
