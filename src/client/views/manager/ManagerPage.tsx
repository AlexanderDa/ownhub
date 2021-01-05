import React, { useState } from "https://esm.sh/react@17.0.1";
import Viewer, { Views } from "../../components/Viewer.tsx";
import Directory from "../../../models/Directory.ts";
import TextField from "../../components/TextField.tsx";
import Breadcrumb from "../../components/Breadcrumb.tsx";
import Uploader from "../../components/Uploader.tsx";
import Button from "../../components/Button.tsx";
import Dialog from "../../components/Dialog.tsx";
import Icon from "../../components/Icon.tsx";
import Box from "../../components/Box.tsx";

export interface ManagerOptions extends Directory {
  search: string;
  loading: boolean;
}

interface Props extends ManagerOptions {
  onSearch: (value: string) => void;
  onChangePath: (path: string) => void;
  onUpload: (files: File) => void;
  createNewFolder: (value: string) => void;
}

export default (props: Props): JSX.Element => {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [showUploader, setShowUploader] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formName, setFormName] = useState("");
  const [view, setView] = useState<Views>("grid");

  const createFolderHandle = () => {
    props.createNewFolder(formName);
    setShowForm(false);
  };

  const selectedFiles = (files: any) => {
    props.onUpload(files);
  };

  const { search, path, folders, files, loading } = props;

  return (
    <Box className="flex h-screen overflow-y-hidden bg-white">
      <Box className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Toolbar */}
        <header className="flex-shrink-0 border-b shadow">
          <Box className="flex items-center justify-between p-2">
            <Box className="flex items-center space-x-3">
              <h1 className="p-2 font-semibold tracking-wider uppercase text-gray-600">
                OwnHub
              </h1>
            </Box>

            {/* Desktop search box */}
            <Box className="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={({ target }: any) => props.onSearch(target.value)}
                className="px-4 py-3 rounded-md bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
              />
            </Box>

            {/* Toolbar right */}
            <Box className="relative flex items-center space-x-3">
              <Box className="md:hidden">
                <Button
                  onClick={() => setShowSearchMobile(true)}
                  icon="search"
                />
              </Box>

              <Box className="hidden sm:flex">
                <Button
                  onClick={() => setShowUploader(true)}
                  tooltip-position="bottom"
                  tooltip-text="Upload"
                  icon="cloud-upload"
                />

                <Button
                  onClick={() => setShowForm(true)}
                  tooltip-position="bottom"
                  tooltip-text="New Folder"
                  icon="folder-plus"
                />
                <Button
                  tooltip-position="bottom"
                  tooltip-text={view === "grid" ? "List view" : "Grid view"}
                  icon={view === "grid" ? "layout-list" : "layout-grid"}
                  onClick={() => setView(view === "grid" ? "list" : "grid")}
                />
              </Box>

              <Button
                tooltip-position="bottom"
                tooltip-text="More"
                icon="more"
              />
            </Box>
          </Box>
          <Breadcrumb path={path} onChangePath={props.onChangePath} />
        </header>

        {/*<!-- Main content -->*/}
        <main className="flex-1 bg-gray-50 max-h-full p-2 md:px-5 overflow-hidden overflow-y-scroll">
          <Viewer
            view={view}
            search={search}
            loading={loading}
            directory={{ path, files, folders }}
            onChangePath={props.onChangePath}
          />
        </main>
      </Box>

      {/********************************************************************
       *                              Dialogs                              *
       ********************************************************************/}

      {/* Mobile search box */}
      <Dialog show={showSearchMobile}>
        <Box className="absolute inset-x-0 flex items-center justify-between p-2 bg-white shadow-md">
          <Box className="flex items-center flex-1 px-2 space-x-2">
            <Icon name="search" className="text-gray-500" />

            <input
              type="text"
              placeholder="Search"
              onChange={({ target }: any) => props.onSearch(target.value)}
              value={search}
              className="w-full px-4 py-3 text-gray-600 rounded-md focus:bg-gray-100 focus:outline-none"
            />
          </Box>
          <Button icon="close" onClick={() => setShowSearchMobile(false)} />
        </Box>
      </Dialog>

      {/* Form */}

      <Dialog show={showForm}>
        <Box className="fixed z-10 inset-0 overflow-y-auto">
          <Box className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />

            <Box className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <Box className="flex items-center justify-between bg-gray-50">
                <span className="pl-2 text-lg text-gray-700">New Folder</span>
                <Button icon="close" onClick={() => setShowForm(false)} />
              </Box>
              <Box className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <TextField
                  label="Name"
                  onChange={({ target }: any) => setFormName(target.value)}
                />
              </Box>

              <Box className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  text="Create"
                  color="white"
                  onClick={createFolderHandle}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                />
                <Button
                  text="Cancel"
                  onClick={() => setShowForm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>

      <Uploader show={showUploader} />
    </Box>
  );
};
