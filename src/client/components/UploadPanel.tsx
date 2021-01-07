import React, { useState } from "https://esm.sh/react@17.0.1";
import Entry from "../../models/Entry.ts";
import Dropzone from "./Dropzone.tsx";
import Uploader from "./Uploader.tsx";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

interface Props {
  show: boolean;
  onClose: () => void;
  onUpload: (path: string, entry: Entry) => void;
}

export default (props: Props) => {
  const [count, setCount] = useState(0);
  const [maximized, setMaximized] = useState(true);
  const [files, setFiles] = useState<Array<File>>([]);

  const { show, onClose, onUpload } = props;

  const selectedFiles = (files: Array<File>) => {
    for (const iterator of files) {
      setFiles((state) => [...state, iterator]);
    }
  };

  const handleRemove = (file: File) => {
    setCount((c) => c - 1);
    setFiles((list) => list.filter((item) => !Object.is(item, file)));
  };

  const handleUpload = (path: string, entry: Entry) => {
    setCount((c) => c + 1);
    onUpload(path, entry);
  };

  const handleClose = () => {
    onClose();
    setCount(0);
    setFiles([]);
    setMaximized(true);
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
            <span className="text-sm font-semibold text-gray-600">Upload</span>
          </div>
          <div>
            <Button
              icon={maximized ? "minimize" : "maximize"}
              onClick={() => setMaximized(!maximized)}
            />
            <Button
              icon="close"
              onClick={handleClose}
              disabled={files.length !== count}
            />
          </div>
        </div>

        <div
          className={
            !maximized
              ? "hidden"
              : "bg-gray-50 overflow-hidden overflow-y-scroll h-full"
          }
        >
          <Dropzone
            onSelectedFiles={selectedFiles}
            style={{ height: files.length === 0 ? "calc(100% - 100px)" : "" }}
          />

          <div className="container grid grid-cols-12 gap-2 pt-5 mx-auto w-full items-center justify-center ">
            {files.map((element) => (
              <div className="col-span-12">
                <Uploader
                  file={element}
                  uploaded={handleUpload}
                  onRemove={() => handleRemove(element)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
