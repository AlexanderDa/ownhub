import React from "https://esm.sh/react@17.0.1";

interface Props {
  path: string;
}

interface Item {
  name: string;
  path: string;
}

export default (props: Props) => {
  const { path } = props;

  const directories = (): Array<string> => {
    let directories: Array<string> = [];

    for (let index = 0; index < path.length; index++)
      if (path.charAt(index) === "/" && path.substr(0, index) !== "")
        directories.push(path.substr(0, index));

    directories.push(path);
    return directories;
  };
  return (
    <div className="flex overflow-hidden">
      <nav className="flex overflow-hidden"></nav>
    </div>
  );
};
