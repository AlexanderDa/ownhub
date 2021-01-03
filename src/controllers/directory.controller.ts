import { join } from "https://deno.land/std@0.80.0/path/mod.ts";
import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { exists } from "https://deno.land/std@0.80.0/fs/exists.ts";
import { extractor, entryInfo } from "../utils/path.ts";
import Entry from "../models/Entry.ts";

export default {
  list: async (ctx: RouterContext) => {
    let folders: Array<Entry> = [];
    let files: Array<Entry> = [];

    const origin: string = ctx.request.url.origin;
    const { absolute, relative } = await extractor(ctx, "query");

    for await (const entry of Deno.readDir(absolute)) {
      if (entry.isFile)
        files.push(
          await entryInfo(
            join(absolute, entry.name),
            origin.concat(join(relative, entry.name))
          )
        );

      if (entry.isDirectory)
        folders.push(await entryInfo(join(absolute, entry.name)));
    }

    ctx.response.status = 200;
    ctx.response.body = { path: relative, folders, files };
  },

  create: async (ctx: RouterContext) => {
    const { absolute, relative } = await extractor(ctx, "body");

    if (await exists(absolute))
      ctx.throw(403, `${relative} folder already exists.`);

    await Deno.mkdir(absolute);

    ctx.response.body = await entryInfo(absolute);
  },

  copy: (ctx: RouterContext) => {},

  move: (ctx: RouterContext) => {},

  rename: (ctx: RouterContext) => {},

  remove: (ctx: RouterContext) => {},
};
