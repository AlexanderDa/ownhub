import { MultipartReader } from "https://deno.land/std@0.82.0/mime/multipart.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export function uploader() {
  return async (ctx: RouterContext, next: Function) => {
    ctx.params.path = ctx.params.path ? `/${ctx.params.path}` : "/";

    const boundaryRegex = /^multipart\/form-data;\sboundary=(?<boundary>.*)$/;
    const match = ctx.request.headers.get("content-type")!.match(boundaryRegex);
    if (!match) ctx.throw(422, "Invalid upload data.");

    const formBoundary: string = match.groups!.boundary;

    const mr = new MultipartReader(
      ctx.request.serverRequest.body,
      formBoundary
    );

    const form = await mr.readForm(0);

    Object.assign(ctx, {
      files: Array.from(form.entries()),
    });

    next();
  };
}
