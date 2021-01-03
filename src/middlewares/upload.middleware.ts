import { MultipartReader } from "https://deno.land/std@0.82.0/mime/multipart.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";


/**
 * Middleware to upload files.
 */
export function uploader(): (ctx: any, next: Function) => Promise<void> {
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
    const entries = Array.from(form.entries());

    //Validation
    if (entries.length > 1 || entries[0][0] !== "files") {
      await form.removeAll();
      ctx.throw(422, "Invalid upload data.");
    }

    Object.assign(ctx, { files: entries[0][1] });

    await next();
  };
}
