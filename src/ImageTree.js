// @ts-check
import * as cheerio from "cheerio";
import { getOgImageUrl } from "./getOgImageUrl.js";

class ImageTree {
  /**
   * @param {string[]} urls
   */
  constructor(urls) {
    this.urls = urls;
    this.itemsPromise = null;
  }

  async get(key) {
    console.log("key", key);
    if (key == null) {
      throw new ReferenceError(
        `${this.constructor.name}: Cannot get a null or undefined key.`
      );
    }

    const url = this.urls[Number(key)];

    const ogImageUrl = await getOgImageUrl(url);
    if (!ogImageUrl) throw new Error("No og:image tag found");

    const response = await fetch(ogImageUrl);
    if (!response.ok) {
      throw new Error(
        `fetch failed: ${response.status}: ${response.statusText}`
      );
    }

    return response.arrayBuffer();
  }

  async keys() {
    return this.urls.map((url, i) => i.toString());
    // const ogImageUrls = await Promise.all(this.urls.map(getOgImageUrl));
    // const ogImageUrlKeys = ogImageUrls
    //   .filter(Boolean)
    //   .map((imageUrl) => imageUrl.split("/").pop());
    // return ogImageUrls;
  }
}

// https://github.com/WebOrigami/extensions/blob/8902c5919f5895c359eb9902074798027bb32010/dropbox/src/DropboxTree.js

export default function thing(urls) {
  return new ImageTree(urls);
}
