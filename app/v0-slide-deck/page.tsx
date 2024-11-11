import GoogleSlidesCloneComponent from "@/components/google-slides-clone";
import {
  v0Slides,
  v0SlidesTitle,
  v0ProfilePic,
} from "@/app/constants/v0-slide-deck";

export default function GoogleSlidesClone() {
  return (
    <GoogleSlidesCloneComponent
      slides={v0Slides}
      initialTitle={v0SlidesTitle}
      profilePic={v0ProfilePic}
      fullScreenImageQuality={80}
    />
  );
}
