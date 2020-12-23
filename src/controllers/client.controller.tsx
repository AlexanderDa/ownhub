import { RouterContext } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { renderToString } from "https://esm.sh/react-dom@17.0.1/server";
import React from "https://esm.sh/react@17.0.1";
import App from "../client/App.tsx";
import ClientJS from "../client/client.tsx";

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
        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <script type="module" src="/bundle.js"></script>
        <link rel="stylesheet" href="/styles.css">
        <title>OwnHub</title>
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
      </body>
    </html>
    `.replace(/\n|\r/g, "");
  },

  bundleJS: (ctx: RouterContext) => {
    ctx.response.headers.set("content-type", "application/javascript");
    ctx.response.body = `
    import ReactDOM from "https://esm.sh/react-dom@17.0.1";
    import React, { useState } from "https://esm.sh/react@17.0.1";
   ${ClientJS}
    ReactDOM.hydrate(React.createElement(App), document.getElementById("root"));

    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    `
      .replace(/\s+/g, " ")
      .trim();
  },

  style: (ctx: RouterContext) => {
    ctx.response.headers.set("content-type", "text/css");
    ctx.response.body = `
  /****************************************************************
  *                          Scrollbar                            *
  ****************************************************************/
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #e6e6e6;
  }
  ::-webkit-scrollbar-thumb:vertical:active {
    background: #969696;
  }

  /****************************************************************
  *                          Selection                            *
  ****************************************************************/
  /* Disable selection */
  body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  /* Enable selecction */
  .selectable {
    -webkit-touch-callout: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

 /****************************************************************
  *                            Tooltip                            *
  ****************************************************************/
  [tooltip-text] {position: relative; z-index: 10;}
  
  /* Positioning and visibility settings of the tooltip-text */
  [tooltip-text]:before, [tooltip-text]:after {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    bottom: calc(100% + 5px); /* 5px is the size of the arrow */
    pointer-events: none;
    transition: 0.2s;
    will-change: transform;
  }
  
  /* The actual tooltip-text with a dynamic width */
  [tooltip-text]:before {
    content: attr(tooltip-text);
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
  [tooltip-text]:after {
    content: '';
    border-style: solid;
    border-width: 5px 5px 0px 5px;
    border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
    transition-duration: 0s;
    transform-origin: top;
    transform: translateX(-50%) scaleY(0);
  }
  
  /* Tooltip becomes visible at hover */
  [tooltip-text]:hover:before,
  [tooltip-text]:hover:after {
    visibility: visible;
    opacity: 1;
  }
  /* Scales from 0.5 to 1 -> grow effect */
  [tooltip-text]:hover:before {
    transition-delay: 1s;
    transform: translate(-50%, -5px) scale(1);
  }
  /* 
    Arrow slide down effect only on mouseenter (NOT on mouseleave)
  */
  [tooltip-text]:hover:after {
    transition-delay: 1.2s; /* Starting after the grow effect */
    transition-duration: 0.2s;
    transform: translateX(-50%) scaleY(1);
  }
  
  /* LEFT */
  /* Tooltip + arrow */
  [tooltip-position="left"]:before,
  [tooltip-position="left"]:after {
    left: auto;
    right: calc(100% + 5px);
    bottom: 50%;
  }
  
  /* Tooltip */
  [tooltip-position="left"]:before {
    transform: translate(-5px, 50%) scale(0.5);
  }
  [tooltip-position="left"]:hover:before {
    transform: translate(-5px, 50%) scale(1);
  }
  
  /* Arrow */
  [tooltip-position="left"]:after {
    border-width: 5px 0px 5px 5px;
    border-color: transparent transparent transparent rgba(55, 64, 70, 0.9);
    transform-origin: left;
    transform: translateY(50%) scaleX(0);
  }
  [tooltip-position="left"]:hover:after {
    transform: translateY(50%) scaleX(1);
  }
  
  
  
  /* RIGHT */
  [tooltip-position="right"]:before,
  [tooltip-position="right"]:after {
    left: calc(100% + 5px);
    bottom: 50%;
  }
  
  [tooltip-position="right"]:before {
    transform: translate(5px, 50%) scale(0.5);
  }
  [tooltip-position="right"]:hover:before {
    transform: translate(5px, 50%) scale(1);
  }
  
  [tooltip-position="right"]:after {
    border-width: 5px 5px 5px 0px;
    border-color: transparent rgba(55, 64, 70, 0.9) transparent transparent;
    transform-origin: right;
    transform: translateY(50%) scaleX(0);
  }
  [tooltip-position="right"]:hover:after {
    transform: translateY(50%) scaleX(1);
  }
  
  
  
  /* BOTTOM */
  [tooltip-position="bottom"]:before,
  [tooltip-position="bottom"]:after {
    top: calc(100% + 5px);
    bottom: auto;
  }
  
  [tooltip-position="bottom"]:before {
    transform: translate(-50%, 5px) scale(0.5);
  }
  [tooltip-position="bottom"]:hover:before {
    transform: translate(-50%, 5px) scale(1);
  }
  
  [tooltip-position="bottom"]:after {
    border-width: 0px 5px 5px 5px;
    border-color: transparent transparent rgba(55, 64, 70, 0.9) transparent;
    transform-origin: bottom;
  }
  `
      .replace(/\n/g, "")
      .replace(/\s\s+/g, " ");
  },
};
