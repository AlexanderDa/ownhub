import React from "https://dev.jspm.io/react@17.0.1";

export default (props) => {
  return (
    <span {...props}>
      <i className="material-icons">{props.name}</i>
    </span>
  );
};
