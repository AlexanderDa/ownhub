import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { FormFile } from "https://deno.land/std@0.82.0/mime/multipart.ts";
import { extractor } from "../utils/path.ts";

export default {
  upload: async (ctx: RouterContext) => {
    //@ts-ignore
    const files: FormFile | Array<FormFile> = ctx.files;

    ctx.response.body = {
      path: await extractor(ctx, "params"),

      files,
    };
  },
};
