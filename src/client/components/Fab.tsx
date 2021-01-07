import React, { useState } from "https://esm.sh/react@17.0.1";
import Icon from "./Icon.tsx";

interface Props {
  bottomSpace?: boolean;
  onUpload: () => void;
  onFolderPlus: () => void;
}

export default (props: Props) => {
  const [active, setActive] = useState(false);

  const { bottomSpace, onFolderPlus, onUpload } = props;

  const handleActive = () => setActive((v) => !v);

  const handleFolder = () => {
    setActive(false);
    onFolderPlus();
  };

  const handleUpload = () => {
    setActive(false);
    onUpload();
  };

  return (
    <div
      className={`fixed z-10 flex flex-col items-center sm:hidden right-2 
        ${bottomSpace === true ? "bottom-14" : "bottom-2"}`}
    >
      <div className={active ? "flex flex-col" : "hidden"}>
        <button
          onClick={handleUpload}
          className="p-3 mb-4 bg-blue-400 rounded-full focus:outline-none"
        >
          <Icon name="cloud-upload" className="text-white" size={20} />
        </button>
        <button
          onClick={handleFolder}
          className=" p-3 mb-4 bg-blue-400 rounded-full focus:outline-none"
        >
          <Icon name="folder-plus" className="text-white" size={20} />
        </button>
      </div>
      <button
        onClick={handleActive}
        className=" p-3 bg-blue-500 rounded-full focus:outline-none focus:ring"
      >
        <Icon name="more" className="text-white" size={30} />
      </button>
    </div>
  );
};
