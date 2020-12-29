import React from "https://esm.sh/react@17.0.1";
import Icon, { IconName } from "./Icon.tsx";

interface Props extends Omit<React.HtmlHTMLAttributes<any>, "children"> {
  icon?: IconName;
  color?: string;
  text?: string;
}

export default (props: Props) => {
  const { icon, text } = props;
  let { color } = props;
  color = color ? `text-${color}` : "text-gray-600";

  return (
    <button
      className={`mx-1 p-2 hover:bg-gray-100 text-base font-medium rounded${
        icon && !text ? "-full" : ""
      } focus:outline-none focus:ring`}
      {...props}
    >
      <div className={`flex items-center`}>
        {icon ? <Icon name={icon} className={color} /> : null}{" "}
        {text ? <p className={`pl-1 ${color}`}>{text}</p> : null}
      </div>
    </button>
  );
};
