import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { FormFile } from "https://deno.land/std@0.82.0/mime/multipart.ts";
import { exists } from "https://deno.land/std@0.83.0/fs/exists.ts";
import { join } from "https://deno.land/std@0.80.0/path/mod.ts";
import { move } from "https://deno.land/std@0.83.0/fs/move.ts";
import { entryInfo } from "../utils/path.ts";
import { extractor } from "../utils/path.ts";
import Entry from "../models/Entry.ts";

export default {
  upload: async (ctx: RouterContext) => {
    //@ts-ignore
    const files: FormFile | Array<FormFile> = ctx.files;
    const { absolute, relative } = await extractor(ctx, "params");
    const origin: string = ctx.request.url.origin;
    let resFiles: Entry | Array<Entry> = [];

    const uploaded = async (file: FormFile) => {
      let filename = join(absolute, file.filename);
      filename = (await exists(filename))
        ? join(absolute, Date.now() + "-" + file.filename)
        : filename;

      await move(file.tempfile as string, filename);
      return await entryInfo(
        filename,
        origin.concat(join(relative, filename.split("/").pop() as string))
      );
    };

    if (Array.isArray(files))
      for (const file of files) resFiles.push(await uploaded(file));
    else resFiles = await uploaded(files);

    ctx.response.body = resFiles;
  },
};
