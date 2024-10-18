// @ts-check
import * as cheerio from "cheerio";

/**
 * Given a URL, return the og:image URL.
 * @param {string} url
 * @returns {Promise<string | undefined>}
 */
export async function getOgImageUrl(url) {
  return fetch(url)
    .then((res) => res.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const ogImage = $('meta[property="og:image"]').attr("content");
      if (!ogImage) throw new Error("No og:image tag found");
      return ogImage;
    })
    .catch((err) => {
      console.error("Error fetching image:", err);
      return undefined;
    });
}
