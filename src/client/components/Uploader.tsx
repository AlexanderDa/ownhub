import React, { useState } from "https://esm.sh/react@17.0.1";
import {byteToString} from '../../utils/path.ts'
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";
interface Props extends React.HtmlHTMLAttributes<any> {
  show?: boolean;
}

export default (props: Props) => {
  const [maximized, setMaximized] = useState(true);
  const [files, setFiles] = useState<Array<any>>([]);

  const { show } = props;

  const selectedFiles = (files: Array<Object>) => {
    const list: Array<Object> = [];
    for (const iterator of files) {
      
      list.push(iterator);
    }
    setFiles(list);
  };

  return show === true ? (
    <div
      className={
        maximized
          ? "fixed inset-0 z-10"
          : "fixed z-10 h-auto w-full right-0 bottom-0 md:w-96 md:right-3 md:bottom-3"
      }
    >
      <div className="bg-gray-200 shadow rounded overflow-hidden h-full border-2">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex">
            <Icon name="cloud-upload" className="mx-2 text-gray-600" />
            <span className="text-sm font-semibold text-gray-600">
              Uploader
            </span>
          </div>
          <div>
            <Button
              icon={maximized ? "minimize" : "maximize"}
              onClick={() => setMaximized(!maximized)}
            />
            <Button icon="close" />
          </div>
        </div>

        {maximized ? (
          <div className="bg-gray-50 overflow-hidden overflow-y-scroll h-full">
            {files.length === 0 ? (
              <div
                className="border-4 border-dashed border-gray-200 rounded-lg m-5 "
                style={{ height: "calc(100% - 100px)" }}
              >
                <label className="flex flex-col items-center h-full">
                  <input
                    multiple
                    type="file"
                    className="hidden"
                    onChange={({ target }: any) => selectedFiles(target.files)}
                  />
                  <Icon
                    className="fill-current text-gray-100"
                    name="cloud"
                    size={200}
                  />
                  <span className="text-sm text-gray-400">
                    Drag and drop files here to upload
                  </span>
                  <span className="text-sm font-semibold text-gray-400">
                    Or click to select files
                  </span>
                </label>
              </div>
            ) : (
              <div className="container grid grid-cols-12 gap-2 pt-5 mx-auto w-full items-center justify-center ">
                {files.map((element) => (
                  <div className="col-span-12">
                    <div className="flex flex-row bg-white shadow-sm rounded p-2 w-full">
                      <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl bg-gray-100 text-gray-500">
                        <Icon name="file" className="text-gray-500" />
                      </div>
                      <div className="flex flex-col flex-grow ml-4">
                        <div
                          className="text-sm font-semibold text-gray-600"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {element.name}
                        </div>
                        <div className="text-sm font-light text-gray-500">
                          {byteToString(element.size)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};
