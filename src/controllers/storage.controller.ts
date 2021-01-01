import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { MultipartReader } from "https://deno.land/std@0.82.0/mime/multipart.ts";

export default {
  upload: async (ctx: RouterContext) => {
    const boundaryRegex = /^multipart\/form-data;\sboundary=(?<boundary>.*)$/;
    const match = ctx.request.headers.get("content-type")!.match(boundaryRegex);

    //@ts-ignore
    const formBoundary: string = match.groups!.boundary;
    const mr = new MultipartReader(
      ctx.request.serverRequest.body,
      formBoundary
    );
    const form = await mr.readForm(0);
    //let res: any = {};
    let entries: any = Array.from(form.entries());

    ctx.response.body = {
      length: ctx.request.headers.get("content-length"),
      entries,
    };
  },
};
