import React from "https://esm.sh/react@17.0.1";

export default (props: React.HtmlHTMLAttributes<any>) => (
  <div {...props}>{props.children}</div>
);
