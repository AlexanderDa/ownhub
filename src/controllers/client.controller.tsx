import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import ReactDOMServer from "https://dev.jspm.io/react-dom@17.0.1/server";
import React from "https://dev.jspm.io/react@17.0.1";
import App from "../client/App.jsx";

export default {
  app: (ctx: RouterContext) => {
    ctx.response.body = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module"> 
          import React from "https://dev.jspm.io/react@17.0.1";
          import ReactDOM from "https://dev.jspm.io/react-dom@17.0.1";
          const App = ${App};
          ReactDOM.hydrate(React.createElement(App), document.getElementById("root"));
        </script>
        <title>OwnHub</title>
      </head>
      <body>
        <div id="root">${(ReactDOMServer as any).renderToString(<App />)}</div>
      </body>
    </html>
    `;
  },

  js: (ctx: RouterContext) => {},
};
