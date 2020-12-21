import React from "https://esm.sh/react@17.0.1";
import Box from "./components/Box.tsx";

import Icon from "./components/Icon.tsx";

export default () => {
  return (
    <Box className="flex flex-col w-screen h-screen bg-gray-50">
      {/* Header */}
      <Box className="bg-green-300">
        <nav className="bg-yellow shadow">
          <div className="container  pl-5 pr-2 py-3 md:flex md:justify-between">
            <div className="flex justify-between items-center">
              <div>
                <a className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700">
                  OwnHub
                </a>
              </div>

              {/*<!-- Mobile menu button -->*/}
              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                  aria-label="toggle menu"
                >
                  <Icon name="file" />
                </button>
              </div>
            </div>

            {/*<!-- Mobile Menu open: "block", Menu closed: "hidden" -->*/}
            <div className="md:flex items-cegnter bg-red-300">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center bg-gray-100 rounded-md">
                  <div className="pl-2">
                    <Icon name="search" className="text-gray-300 w-6 h-6" />
                  </div>
                  <input
                    className="w-full rounded-md bg-gray-100 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                    type="search"
                    placeholder="search..."
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Box>
      {/*<Box className="bg-yellow-300">Navigation</Box>*/}
      <Box className="block h-full overflow-y-auto p-9">
        <Icon name="calendar" />
        <Icon name="close" />
        <Icon name="delete" />
        <Icon name="download" />
        <Icon name="file" />
        <Icon name="folder" />
        <Icon name="folder-plus" />
        <Icon name="home" />
        <Icon name="link" />
        <Icon name="more" />
        <Icon name="pencil" />
        <Icon name="search" />
        <Icon name="upload" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="flex flex-row bg-white shadow-sm rounded p-2">
              <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                <Icon
                  name="folder"
                  className="text-blue-300 fill-current"
                  size={32}
                />
              </div>
              <div className="flex flex-col flex-grow ml-4">
                <div className="text-sm text-gray-500">Users</div>
                <div className="font-bold text-lg">1259</div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="flex flex-row bg-white shadow-sm rounded p-2">
              <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col flex-grow ml-4">
                <div className="text-sm text-gray-500">Orders</div>
                <div className="font-bold text-lg">230</div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="flex flex-row bg-white shadow-sm rounded p-2">
              <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                <Icon name="file" className="text-blue-300" size={32} />
              </div>
              <div className="flex flex-col flex-grow ml-4">
                <div className="text-sm text-gray-500">
                  New Clients readey to create abigget product
                </div>
                <div className="font-bold text-lg">190</div>
              </div>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-3">
            <div className="flex flex-row bg-white shadow-sm rounded p-2">
              <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col flex-grow ml-4">
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="font-bold text-lg">$ 32k</div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};
