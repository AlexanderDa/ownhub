import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import ReactDOMServer from "https://dev.jspm.io/react-dom@17.0.1/server";
import React from "https://dev.jspm.io/react@17.0.1";
import App from "../client/App.jsx";
import AppDeps from "../client/deps.jsx";

export default {
  index: (ctx: RouterContext) => {
    ctx.response.redirect("/app");
  },

  app: (ctx: RouterContext) => {
    ctx.response.body = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!--link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"--> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script type="module" src="/bundle.js"></script>
        <link rel="stylesheet" href="/styles.css">
        <title>OwnHub</title>
      </head>
      <body>
        <div id="root">${(ReactDOMServer as any).renderToString(<App />)}</div>
      </body>
    </html>
    `;
  },

  bundleJS: (ctx: RouterContext) => {
    ctx.response.headers.set("content-type", "application/javascript");
    ctx.response.body = `
    import React from "https://dev.jspm.io/react@17.0.1";
    import ReactDOM from "https://dev.jspm.io/react-dom@17.0.1";
   ${AppDeps}
    ReactDOM.hydrate(React.createElement(App), document.getElementById("root"));
    `;
  },

  style: (ctx: RouterContext) => {
    ctx.response.headers.set("content-type", "text/css");
    ctx.response.body = `
    * { margin: 0; padding: 0;}
    html {
      line-height: 1.5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.87);
    }
    `;
  },
};
