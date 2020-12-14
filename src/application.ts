import { Application as App } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { existsSync } from "https://deno.land/std@0.80.0/fs/exists.ts";
import { send } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import DirectoryRoure from "./routes/directory.route.ts";

export default class Application extends App {
  constructor(config: { path: string }) {
    super();

    if (!existsSync(config.path))
      throw new Error(`The ${config.path} directory doesn't exist.`);

    this.setMiddlewares(config.path);
    this.setRoutes();
  }

  private setMiddlewares(homePath: string) {
    // set home path
    this.use(async (ctx, next) => {
      ctx.request.headers.set("Home-Path", homePath);
      await next();
    });
  }

  private setRoutes() {
    this.use(DirectoryRoure.routes());
    this.use(DirectoryRoure.allowedMethods());

    this.use(async (ctx) => {
      const path: string = ctx.request.headers.get("Home-Path") || "";
      await send(ctx, ctx.request.url.pathname, { root: path });
    });
  }
}
