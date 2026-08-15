import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import satteriCallouts from "satteri-callouts";
import { defineMdastPlugin } from "satteri";

const OBSIDIAN_EMBED =
  /^!\[\[([^[\]|]+\.(?:png|jpe?g|gif|webp|avif|svg))(?:\|([^[\]]*))?\]\]$/i;
const IMAGE_DIR = "../assets/";

const images = defineMdastPlugin({
  name: "format-images",
  text(node, ctx) {
    const match = OBSIDIAN_EMBED.exec(node.value.trim());
    if (!match) return;

    const [, image, alt] = match;
    ctx.replaceNode(node, { type: "image", url: IMAGE_DIR + image, alt: alt ?? "" });
  },
});

export default defineConfig({
  site: "https://abhishekkr.me",
  markdown: {
    processor: satteri({
      hastPlugins: [satteriCallouts()],
      mdastPlugins: [images]
    })
  }
});
