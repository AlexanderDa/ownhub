import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export default {
  format: async (ctx: RouterContext, next: Function) => {
    if (ctx.request.hasBody) {
      console.log((await ctx.request.body().value).path);
    }
    next();
  },
};
