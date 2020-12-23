import React, { useState } from "https://esm.sh/react@17.0.1";
import Dialog from "./components/Dialog.tsx";
import Button from "./components/Button.tsx";
import Box from "./components/Box.tsx";
import Icon from "./components/Icon.tsx";

export default () => {
  const [search, setSearch] = useState(false);

  return (
    <Box className="flex h-screen overflow-y-hidden bg-white">
      <Box className="flex flex-col flex-1 h-full overflow-hidden">
        {/*<!-- Navbar -->*/}
        <header className="flex-shrink-0 border-b shadow">
          <Box className="flex items-center justify-between p-2">
            {/*<!-- Navbar left -->*/}
            <Box className="flex items-center space-x-3">
              <span className="p-2 font-semibold tracking-wider uppercase text-gray-600">
                OwnHub
              </span>
            </Box>

            {/*<!-- Mobile search box -->*/}
            <Dialog show={search}>
              <Box className="absolute inset-x-0 flex items-center justify-between p-2 bg-white shadow-md">
                <Box className="flex items-center flex-1 px-2 space-x-2">
                  <Icon name="search" className="text-gray-500" />

                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-3 text-gray-600 rounded-md focus:bg-gray-100 focus:outline-none"
                  />
                </Box>
                <Button icon="close" onClick={() => setSearch(false)} />
              </Box>
            </Dialog>

            {/*<!-- Desktop search box -->*/}
            <Box className="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
              <Icon name="search" />
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-3 rounded-md bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border"
              />
            </Box>

            {/*<!-- Navbar right -->*/}
            <Box className="relative flex items-center space-x-3">
              <Box className="md:hidden">
                <Button onClick={() => setSearch(true)} icon="search" />
              </Box>

              <Box className="hidden sm:flex">
                <Button
                  tooltip-position="bottom"
                  tooltip-text="Upload"
                  icon="upload"
                />
                <Button
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
        </main>
      </Box>
    </Box>
  );
};
