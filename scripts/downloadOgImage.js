// @ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getOgImageUrl } from "./getOgImageUrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {string} url
 */
export default async function downloadOgImage(url) {
  const id = url.split("/").pop();
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
  if (!urlExtension) {
    console.error("Failed to determine file extension from URL: ", ogImageUrl);
    return;
  }
  const fileName = id + urlExtension;

  const filePath = path.resolve(__dirname, "../src/og-images", fileName);
  if (fs.existsSync(filePath)) return;

  fs.writeFileSync(filePath, Buffer.from(await blob.arrayBuffer()));
  return filePath;
}
