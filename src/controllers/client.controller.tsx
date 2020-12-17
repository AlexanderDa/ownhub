import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import * as ReactDOMServer from "https://esm.sh/react-dom@17.0.1/server";
import React from "https://esm.sh/react@17.0.1";
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
    `.replace(/\n|\r/g, "");
  },

  bundleJS: (ctx: RouterContext) => {
    ctx.response.headers.set("content-type", "application/javascript");
    ctx.response.body = `
    import React from "https://dev.jspm.io/react@17.0.1";
    import ReactDOM from "https://dev.jspm.io/react-dom@17.0.1";
   ${AppDeps}
    ReactDOM.hydrate(React.createElement(App), document.getElementById("root"));
    `.replace(/\n|\r/g, "");
  },

  style: (ctx: RouterContext) => {
    ctx.response.headers.set("content-type", "text/css");
    ctx.response.body = `
    *{margin:0;padding:0}
    :root {
      --primary: #0097fc;
      --primary-lighten1: #49b6ff;
      --primary-lighten2: #7ccbff;
      --primary-darken1: #0088e3;
      --primary-darken2: #0078c9;
      --primary-text: #ffffff;
    }

    html {
      line-height: 1.5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.87);
    }

    .primary{background-color:var(--primary)}
    .primary.lighten1{background-color:var(--primary-lighten1)}
    .primary.lighten2{background-color:var(--primary-lighten2)}
    .primary.lighten3{background-color:var(--primary-lighten3)}
    .primary.darken1{background-color:var(--primary-darken1)}
    .primary.darken2{background-color:var(--primary-darken2)}
    .primary.darken3{background-color:var(--primary-darken3)}
    .primary-text{color:var(--primary-text)}
    
    

  /****************************************************************
  *                            Tooltip                            *
  ****************************************************************/
  [tooltip] {position: relative; z-index: 10;}
  
  /* Positioning and visibility settings of the tooltip */
  [tooltip]:before, [tooltip]:after {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    bottom: calc(100% + 5px); /* 5px is the size of the arrow */
    pointer-events: none;
    transition: 0.2s;
    will-change: transform;
  }
  
  /* The actual tooltip with a dynamic width */
  [tooltip]:before {
    content: attr(tooltip);
    padding: 5px 10px;
    min-width: 50px;
    max-width: 300px;
    width: max-content;
    width: -moz-max-content;
    border-radius: 6px;
    font-size: 12px;
    background-color: rgba(59, 72, 80, 0.9);
    background-image: linear-gradient(30deg,
      rgba(59, 72, 80, 0.44),
      rgba(59, 68, 75, 0.44),
      rgba(60, 82, 88, 0.44));
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    white-space: pre-wrap;
    transform: translate(-50%, -5px) scale(0.5);
  }
  
  /* Tooltip arrow */
  [tooltip]:after {
    content: '';
    border-style: solid;
    border-width: 5px 5px 0px 5px;
    border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
    transition-duration: 0s;
    transform-origin: top;
    transform: translateX(-50%) scaleY(0);
  }
  
  /* Tooltip becomes visible at hover */
  [tooltip]:hover:before,
  [tooltip]:hover:after {
    visibility: visible;
    opacity: 1;
  }
  /* Scales from 0.5 to 1 -> grow effect */
  [tooltip]:hover:before {
    transition-delay: 0.3s;
    transform: translate(-50%, -5px) scale(1);
  }
  /* 
    Arrow slide down effect only on mouseenter (NOT on mouseleave)
  */
  [tooltip]:hover:after {
    transition-delay: 0.5s; /* Starting after the grow effect */
    transition-duration: 0.2s;
    transform: translateX(-50%) scaleY(1);
  }
  
  /* LEFT */
  /* Tooltip + arrow */
  [tooltip-location="left"]:before,
  [tooltip-location="left"]:after {
    left: auto;
    right: calc(100% + 5px);
    bottom: 50%;
  }
  
  /* Tooltip */
  [tooltip-location="left"]:before {
    transform: translate(-5px, 50%) scale(0.5);
  }
  [tooltip-location="left"]:hover:before {
    transform: translate(-5px, 50%) scale(1);
  }
  
  /* Arrow */
  [tooltip-location="left"]:after {
    border-width: 5px 0px 5px 5px;
    border-color: transparent transparent transparent rgba(55, 64, 70, 0.9);
    transform-origin: left;
    transform: translateY(50%) scaleX(0);
  }
  [tooltip-location="left"]:hover:after {
    transform: translateY(50%) scaleX(1);
  }
  
  
  
  /* RIGHT */
  [tooltip-location="right"]:before,
  [tooltip-location="right"]:after {
    left: calc(100% + 5px);
    bottom: 50%;
  }
  
  [tooltip-location="right"]:before {
    transform: translate(5px, 50%) scale(0.5);
  }
  [tooltip-location="right"]:hover:before {
    transform: translate(5px, 50%) scale(1);
  }
  
  [tooltip-location="right"]:after {
    border-width: 5px 5px 5px 0px;
    border-color: transparent rgba(55, 64, 70, 0.9) transparent transparent;
    transform-origin: right;
    transform: translateY(50%) scaleX(0);
  }
  [tooltip-location="right"]:hover:after {
    transform: translateY(50%) scaleX(1);
  }
  
  
  
  /* BOTTOM */
  [tooltip-location="bottom"]:before,
  [tooltip-location="bottom"]:after {
    top: calc(100% + 5px);
    bottom: auto;
  }
  
  [tooltip-location="bottom"]:before {
    transform: translate(-50%, 5px) scale(0.5);
  }
  [tooltip-location="bottom"]:hover:before {
    transform: translate(-50%, 5px) scale(1);
  }
  
  [tooltip-location="bottom"]:after {
    border-width: 0px 5px 5px 5px;
    border-color: transparent transparent rgba(55, 64, 70, 0.9) transparent;
    transform-origin: bottom;
  }
  
  
  
  
  
    `;
  },
};
