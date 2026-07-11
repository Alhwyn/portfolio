import {
  createSiteOgImage,
  siteOgImageAlt,
  siteOgImageSize,
} from "@/lib/site-og-image";

export const alt = siteOgImageAlt;
export const size = siteOgImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSiteOgImage();
}
