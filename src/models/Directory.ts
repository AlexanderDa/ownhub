import Entry from "./Entry.ts";

export default interface Directory {
  path: string;
  files: Array<Entry>;
  folders: Array<Entry>;
}
