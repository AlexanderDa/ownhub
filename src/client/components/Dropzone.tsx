import React, { useRef } from "https://esm.sh/react@17.0.1";
import Icon from "./Icon.tsx";
interface Props {
  style?: React.CSSProperties;
  onSelectedFiles: (files: Array<File>) => void;
}
export default (props: Props) => {
  const { onSelectedFiles, style } = props;

  const fileInputRef = useRef<any>();

  const dragOver = (e: React.DragEvent) => e.preventDefault();

  const dragEnter = (e: React.DragEvent) => e.preventDefault();

  const dragLeave = (e: React.DragEvent) => e.preventDefault();

  const filesSelected = () => {
    if (fileInputRef.current.files.length)
      onSelectedFiles(fileInputRef.current.files);
  };

  const fileDrop = (e: React.DragEvent<any>) => {
    e.preventDefault();
    const { files } = e.dataTransfer as any;
    if (files.length) onSelectedFiles(files);
  };

  return (
    <div
      className="border-4 border-dashed border-gray-200 rounded-lg m-5 "
      style={style}
    >
      <label
        className="flex flex-col items-center h-full"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <input
          multiple
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={filesSelected}
        />
        <Icon className="fill-current text-gray-100" name="cloud" size={200} />
        <span className="text-sm text-gray-400">
          Drag and drop files here to upload
        </span>
        <span className="text-sm font-semibold text-gray-400">
          Or click to select files
        </span>
      </label>
    </div>
  );
};
