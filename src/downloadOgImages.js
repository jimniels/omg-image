// @ts-check
import * as cheerio from "cheerio";

const tree = {
  async get(key) {
    return `url ${key}`;
  },
  async keys() {
    return ["url1", "url2", "url3"];
  },
};

export default tree;
