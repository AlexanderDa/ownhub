import { contentType } from "https://deno.land/x/media_types@v2.5.2/mod.ts";
import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v6.3.2/helpers.ts";
import { encodeUrl } from "https://deno.land/x/oak@v6.3.2/util.ts";
import { join } from "https://deno.land/std@0.80.0/path/mod.ts";
import Entry from "../models/Entry.ts";

interface PathInfo {
  absolute: string;
  relative: string;
}

/**
 *
 * @param ctx
 * @param source
 * @param propName
 */
export async function extractor(
  ctx: RouterContext,
  source: "query" | "body" | "params",
  propName?: string
): Promise<PathInfo> {
  const homePath: string = ctx.request.headers.get("Home-Path") || "";
  let path: string = "";

  switch (source) {
    case "body":
      path = (await ctx.request.body().value)[propName || "path"];
      break;
    case "params":
      const param = ctx.params[propName || "path"] as string;
      path = param ? `/${param}` : "/";
      break;
    case "query":
      path = JSON.parse(getQuery(ctx).query)[propName || "path"];
      break;
  }

  if (!path) {
    const err = `${
      propName || "path"
    } property doesn't exist in the ${source}.`;
    ctx.throw(400, err);
  }

  return {
    absolute: join(homePath, path),
    relative: path,
  };
}

export async function entryInfo(path: string, url?: string) {
  let entry: Entry;
  const status = await Deno.stat(path);
  const name = path.split("/").pop() as string;

  entry = status.isDirectory
    ? {
        name,
        bytes: status.size,
        size: byteToString(status.size),
      }
    : {
        name,
        bytes: status.size,
        size: byteToString(status.size),
        url: url ? encodeUrl(url) : undefined,
        media: contentType(name),
      };
  return entry;
}

export function byteToString(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
