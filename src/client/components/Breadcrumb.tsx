import React from "https://esm.sh/react@17.0.1";
import Icon from "./Icon.tsx";

interface Props {
  path: string;
  onChangePath: (path: string) => void;
}

export default (props: Props) => {
  const { path } = props;

  const directories = (): Array<string> => {
    let directories: Array<string> = [];

    for (let index = 0; index < path.length; index++)
      if (path.charAt(index) === "/" && path.substr(0, index) !== "")
        directories.push(path.substr(0, index));

    return directories;
  };

  const handleFolder = (path: string) => {
    //@ts-ignore
    window.history.pushState({ dir: path }, path, `/app${path}`);
    props.onChangePath(path);
  };

  return (
    <div className="flex overflow-hidden">
      <nav className="flex overflow-hidden p-2">
        <div className="cursor-pointer" onClick={() => handleFolder("/")}>
          <Icon name="home" />
        </div>

        {directories().map((element) => (
          <div className="breadcrumb-wrap">
            <i className="px-2 text-sm  text-gray-600">/</i>
            <a
              className="text-sm  text-gray-600 hover:text-gray-400"
              onClick={() => handleFolder(element)}
            >
              {element.split("/").pop()}
            </a>
          </div>
        ))}

        <div className="cursor-pointer">
          <i className="px-2 text-sm  text-gray-600">/</i>
          <a
            className="text-sm font-semibold text-gray-600"
            onClick={() => handleFolder(path)}
          >
            {path.split("/").pop()}
          </a>
        </div>
      </nav>
    </div>
  );
};
