import React from "https://esm.sh/react@17.0.1";

interface Props extends React.HtmlHTMLAttributes<any> {
  label?: string;
  error?: string;
}

export default (props: Props) => {
  const { label, error } = props;
  const color = error ? "red" : "blue";
  return (
    <div className="flex flex-col space-y-1">
      <label
        className={`text-sm font-semibold text-${error ? "red" : "gray"}-500`}
      >
        {label}
      </label>
      <input
        autoComplete="none"
        className={`px-4 py-2 transition duration-300 border border-${error ? "red" : "gray"}-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-${color}-300 `}
        {...props}
      />
      <span className={`text-sm text-${color}-500`}>{error}</span>
    </div>
  );
};
