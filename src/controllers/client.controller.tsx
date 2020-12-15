import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import ReactDOMServer from "https://dev.jspm.io/react-dom@17.0.1/server";
import React from "https://dev.jspm.io/react@17.0.1";
import App from "../client/App.jsx";
import Manager from "../client/manager.jsx";
import Icon from "../client/components/icon.jsx";

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
        <script type="module" src="/bundle.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> 
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>* { margin: 0; padding: 0;}</style>
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
    const App = ${App};
    const Manager = ${Manager};
    const Icon = ${Icon}
    ReactDOM.hydrate(React.createElement(App), document.getElementById("root"));
    `;
  },
};
