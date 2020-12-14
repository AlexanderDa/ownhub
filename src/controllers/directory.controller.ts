import { join } from "https://deno.land/std@0.80.0/path/mod.ts";
import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { exists } from "https://deno.land/std@0.80.0/fs/exists.ts";
import { getQuery } from "https://deno.land/x/oak@v6.3.2/helpers.ts";
import { encodeUrl } from "https://deno.land/x/oak@v6.3.2/util.ts";
import { contentType } from "https://deno.land/x/media_types@v2.5.2/mod.ts";

interface PathInfo {
  absolute: string;
  relative: string;
}

interface EntryInfo {
  name: string;
  bytes: number;
  size: string;
  url?: string;
  media?: string;
}

export default {
  list: async (ctx: RouterContext) => {
    let folders: Array<EntryInfo> = [];
    let files: Array<EntryInfo> = [];

    const origin: string = ctx.request.url.origin;
    const { absolute, relative } = await extractPath(ctx, "query");

    for await (const entry of Deno.readDir(absolute)) {
      const status = await Deno.stat(join(absolute, entry.name));

      if (entry.isFile) {
        files.push({
          name: entry.name,
          url: encodeUrl(`${origin}${join(relative, entry.name)}`),
          bytes: status.size,
          size: byteToString(status.size),
          media: contentType(entry.name),
        });
      }

      if (entry.isDirectory) {
        folders.push({
          name: entry.name,
          bytes: status.size,
          size: byteToString(status.size),
        });
      }
    }

    ctx.response.status = 200;
    ctx.response.body = { path: relative, folders, files };
  },

  create: async (ctx: RouterContext) => {
    const { absolute, relative } = await extractPath(ctx, "body");

    if (await exists(absolute))
      ctx.throw(403, `${relative} folder already exists.`);

    await Deno.mkdir(absolute);
    const stat = await Deno.stat(absolute);

    ctx.response.body = {
      name: relative.split("/").pop(),
      bytes: stat.size,
      size: byteToString(stat.size),
    };
  },

  copy: (ctx: RouterContext) => {},

  move: (ctx: RouterContext) => {},

  rename: (ctx: RouterContext) => {},

  remove: (ctx: RouterContext) => {},
};

async function extractPath(
  ctx: RouterContext,
  from: "query" | "body",
  propName?: string
): Promise<PathInfo> {
  const homePath: string = ctx.request.headers.get("Home-Path") || "";
  const path =
    from === "body"
      ? (await ctx.request.body().value)[propName || "path"]
      : JSON.parse(getQuery(ctx).query)[propName || "path"];

  if (!path) {
    const err = `${propName || "path"} property doesn't exist in the ${from}.`;
    ctx.throw(400, err);
  }

  return {
    absolute: join(homePath, path),
    relative: path,
  };
}

function byteToString(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
