import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";

export default {
  upload: async (ctx: RouterContext) => {
    ctx.response.body = {
      path: ctx.params.path,
      //@ts-ignore
      params: ctx.files,
    };
  },
};
