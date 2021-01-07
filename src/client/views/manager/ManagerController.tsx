import React from "https://esm.sh/react@17.0.1";
import axios from "https://esm.sh/axios@0.21.1";
import { pathFromBrowser } from "../../utils/browser.ts";
import { ManagerOptions } from "./ManagerPage.tsx";
import ManagerPage from "./ManagerPage.tsx";
import Entry from "../../../models/Entry.ts";

interface Stage extends ManagerOptions {}

export default class ManagerController extends React.Component<any, Stage> {
  public state: Stage = {
    search: "",
    loading: false,
    path: "/",
    folders: [],
    files: [],
  };

  constructor(props: any) {
    super(props);
    this.uploaded = this.uploaded.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.loadDirectory = this.loadDirectory.bind(this);
  }

  /*****************************************************************
   *                           Services                            *
   *****************************************************************/
  async loadDirectory(path: string): Promise<void> {
    this.setState({ loading: true });
    axios
      .get(`/api/directory?query=${JSON.stringify({ path })}`)
      .then(({ data }) => {
        const { path, files, folders } = data;
        this.setState({ path, files, folders, search: "" });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  createFolder(name: string) {
    const path = `${this.state.path}/${name}`;
    axios.post("/api/directory", { path }).then(({ data }) => {
      this.setState((state) => ({ folders: [...state.folders, data] }));
    });
  }

  uploaded(path: string, entry: Entry) {
    if (path === this.state.path)
      this.setState((state) => ({ files: [...state.files, entry] }));
  }

  /*****************************************************************
   *                             React                             *
   *****************************************************************/
  public componentDidMount(): void {
    this.loadDirectory(pathFromBrowser());

    window.addEventListener("popstate", () => {
      this.loadDirectory(pathFromBrowser());
    });
  }
  render() {
    const { path, files, folders, search, loading } = this.state;
    return (
      <ManagerPage
        search={search}
        loading={loading}
        path={path}
        files={files}
        folders={folders}
        onSearch={(value) => this.setState({ search: value })}
        onChangePath={this.loadDirectory}
        onUpload={this.uploaded}
        createNewFolder={this.createFolder}
      />
    );
  }
}
