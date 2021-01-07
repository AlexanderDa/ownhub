import React from "https://esm.sh/react@17.0.1";
import Directory from "../../models/Directory.ts";
import { recordHistory } from "../utils/browser.ts";
import Icon from "./Icon.tsx";

export type Views = "grid" | "list";

interface Props {
  view?: Views;
  search?: string;
  loading?: boolean;
  directory: Directory;
  onChangePath: (path: string) => void;
}

export default (props: Props): JSX.Element => {
  let { path, folders, files } = props.directory;
  const { loading, search, view } = props;

  const isEmpty = folders.length + files.length === 0;

  // filter folders and files
  if (search !== "" && search !== undefined) {
    files = files.filter((file) => {
      return file.name.toLowerCase().indexOf(`${search}`.toLowerCase()) > -1;
    });
    folders = folders.filter((folder) => {
      return folder.name.toLowerCase().indexOf(`${search}`.toLowerCase()) > -1;
    });
  }

  const handleFolder = (folder: string) => {
    const address: string = `${path === "/" ? "" : path}/${folder}`;
    recordHistory(address);
    props.onChangePath(address);
  };

  const Table = (): JSX.Element => (
    <table className="table-auto border-collapse w-full bg-white">
      <thead>
        <tr className="rounded-lg text-sm font-medium bg-gray-200 text-gray-700 text-left">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Size</th>
        </tr>
      </thead>
      <tbody className="text-sm font-normal text-gray-700">
        {folders.map((element) => (
          <tr className="hover:bg-gray-100 border-b border-gray-200 py-4">
            <td>
              <a
                className="px-4 py-1 flex items-center"
                onDoubleClick={() => handleFolder(element.name)}
              >
                <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 text-blue-500">
                  <Icon name="folder" className="fill-current text-blue-500" />
                </div>
                <span className="ml-3">{element.name}</span>
              </a>
            </td>
            <td className="px-4 py-4">{element.size}</td>
          </tr>
        ))}
        {files.map((element) => (
          <tr className="hover:bg-gray-100 border-b border-gray-200 py-4">
            <td className="px-4 py-1 flex items-center">
              <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl bg-gray-100 text-gray-500">
                <Icon name="file" className="text-gray-500" />
              </div>
              <span className="ml-3">{element.name}</span>
            </td>
            <td className="px-4 py-4">{element.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const Grid = (): JSX.Element => (
    <div className="grid grid-cols-12 gap-4">
      {folders.map((element) => (
        <a
          className="col-span-12 sm:col-span-6 md:col-span-4"
          onDoubleClick={() => handleFolder(element.name)}
        >
          <div className="flex flex-row bg-white shadow-sm rounded p-2">
            <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 text-blue-500">
              <Icon name="folder" className="fill-current text-blue-500" />
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div
                className="text-sm font-semibold text-gray-600"
                style={{ overflowWrap: "anywhere" }}
                tooltip-text={element.name}
                tooltip-position="bottom"
              >
                {element.name}
              </div>
              <div className="text-sm font-light text-gray-500">
                {element.size}
              </div>
            </div>
          </div>
        </a>
      ))}
      {files.map((element) => (
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <div className="flex flex-row bg-white shadow-sm rounded p-2">
            <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl bg-gray-100 text-gray-500">
              <Icon name="file" className="text-gray-500" />
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div
                className="text-sm font-semibold text-gray-600"
                style={{ overflowWrap: "anywhere" }}
                tooltip-text={element.name}
                tooltip-position="bottom"
              >
                {element.name}
              </div>
              <div className="text-sm font-light text-gray-500">
                {element.size}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const Empty = (): JSX.Element => (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <Icon className="fill-current text-gray-200" name="folder" size={150} />
      <span className="text-lg font-semibold text-gray-300">
        Folder is Empty
      </span>
    </div>
  );

  const Loading = (): JSX.Element => (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <span className="text-lg font-semibold text-gray-500">Loading ...</span>
    </div>
  );

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : isEmpty === true ? (
        <Empty />
      ) : view === "list" ? (
        <Table />
      ) : (
        <Grid />
      )}
    </div>
  );
};
