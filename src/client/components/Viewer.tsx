import React from "https://esm.sh/react@17.0.1";
import Entry from "../../models/Entry.ts";
import Icon from "./Icon.tsx";

export type Views = "grid" | "list";

interface Props {
  search?: string;
  files: Array<Entry>;
  folders: Array<Entry>;
  view?: Views;
}

export default (props: Props): JSX.Element => {
  const { search, view } = props;
  let { folders, files } = props;

  const isEmpty = folders.length + files.length === 0;

  if (search !== "" && search !== undefined) {
    files = files.filter((file) => {
      return file.name.toLowerCase().indexOf(`${search}`.toLowerCase()) > -1;
    });
    folders = folders.filter((folder) => {
      return folder.name.toLowerCase().indexOf(`${search}`.toLowerCase()) > -1;
    });
  }

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
            <td className="px-4 py-1 flex items-center">
              <div className="flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 text-blue-500">
                <Icon name="folder" className="fill-current text-blue-500" />
              </div>
              <span className="ml-3">{element.name}</span>
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
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
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
        </div>
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
      {/* <div className="col-span-12 sm:col-span-6 md:col-span-3">
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
            <Icon name="folder" className="fill-cullrrent text-blue-500" />
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequuntur, blanditiis. Vel dolore, eos voluptatem non voluptas
              expedita modi eligendi numquam est rerum sed fugit facere nulla
              accusantium impedit quis nam!
            </div>
            <div className="font-bold text-lg">1259</div>
          </div>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="text-xs uppercase font-light text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laudantium at mollitia quaerat est veritatis dignissimos
              molestias, autem quisquam, delectus molestiae dolores id. Nesciunt
              autem quos, molestias ab vero hic impedit.
            </div>
            <div className="text-xl font-bold">4078</div>
          </div>
          <Icon name="folder" className="fill-cullrrent text-blue-500" />
        </div>
      </div>

      <div className="col-span-12 sm:col-span-6 md:col-span-3 bg-white">
        <div className="flex items-center">
          <img
            className="rounded-full h-12 w-12"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/27fdad08-a2c2-4e0b-8983-448c39519643-profile_image-70x70.png"
            alt="Logo"
          />
          <div className="ml-2">
            <div className="text-sm font-semibold text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              culpa quod, ad corporis accusantium, eum quas ducimus sapiente
              ullam temporibus necessitatibus? Perferendis dicta possimus
              quaerat amet, harum itaque officiis pariatur!
            </div>
            <div className="text-sm font-light text-gray-500">
              Level 6 - Warlock
            </div>
          </div>
        </div>
      </div>
  */}
    </div>
  );

  const Empty = (): JSX.Element => <div>Empty</div>;

  return (
    <div>{isEmpty ? <Empty /> : view === "list" ? <Table /> : <Grid />}</div>
  );
};
