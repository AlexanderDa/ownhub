import React, { useState } from "https://esm.sh/react@17.0.1";
import Directory from "../../../models/Directory.ts";
import Button from "../../components/Button.tsx";
import Dialog from "../../components/Dialog.tsx";
import Icon from "../../components/Icon.tsx";
import Box from "../../components/Box.tsx";

export interface ManagerOptions {
  search: string;
  directory: Directory;
}

interface Props extends ManagerOptions {
  onSearch: (value: string) => void;
  createNewFolder: (name: string) => void;
}

export default (props: Props) => {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { search } = props;

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
                  tooltip-position="bottom"
                  tooltip-text="Upload"
                  icon="upload"
                />
                <Button
                  onClick={() => setShowForm(true)}
                  tooltip-position="bottom"
                  tooltip-text="New Folder"
                  icon="folder-plus"
                />
              </Box>

              <Button
                tooltip-position="bottom"
                tooltip-text="More"
                icon="more"
              />
            </Box>
          </Box>
        </header>

        {/*<!-- Main content -->*/}
        <main className="flex-1 bg-gray-50 max-h-full p-5 overflow-hidden overflow-y-scroll">
          {/*<!-- Table see (https://tailwindui.com/components/application-ui/lists/tables) -->*/}
          {JSON.stringify(props.directory)}
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
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="justify-end bg-red-300">
                <span>New Folder</span>
                <Button icon="close" onClick={() => setShowForm(false)} />
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Deactivate account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Crear
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Box>
  );
};
