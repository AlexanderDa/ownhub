import React from "https://esm.sh/react@17.0.1";

interface Props extends React.HtmlHTMLAttributes<any> {
  show?: boolean;
}

export default (props: Props) => {
  const { show } = props;
  return show === true ? (
    <div
      className="fixed inset-0 z-20 bg-black bg-opacity-20"
      style={{ backdropFilter: "blur(10px)" }}
      {...props}
    >
      {props.children}
    </div>
  ) : null;
};
