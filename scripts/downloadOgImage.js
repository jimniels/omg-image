// @ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getOgImageUrl } from "./getOgImageUrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {string} url - the URL of an article, where the og:image will be grabbed from
 * @param {string} id - the id of the image file that will be saved
 */
export default async function downloadOgImage(url, id) {
  // Only try to download the image if we don't already have it
  const exisitingFileName = id + ".jpg";
  const filePath = path.resolve(__dirname, "../static/og-images");
  if (fs.existsSync(filePath)) return;

  const ogImageUrl = await getOgImageUrl(url);
  if (!ogImageUrl) {
    console.error(
      "Failed to download image. There appears to be no og:image in the meta tags. URL: ",
      url
    );
    return;
  }

  const response = await fetch(ogImageUrl);
  const blob = await response.blob();

  const parsedUrl = new URL(ogImageUrl);
  const urlPathname = parsedUrl.pathname;
  let urlExtension = path.extname(urlPathname);
  if (urlExtension === ".jpeg") {
    urlExtension = ".jpg";
  }
  if (urlExtension !== ".jpg") {
    console.error("Error: og:image URL has non-jpg extension: ", ogImageUrl);
    return;
  }
  if (!urlExtension) {
    console.error(
      "Error: Failed to determine file extension from URL: ",
      ogImageUrl
    );
    return;
  }
  const fileName = id + urlExtension;

  fs.writeFileSync(filePath, Buffer.from(await blob.arrayBuffer()));
  return filePath;
}
