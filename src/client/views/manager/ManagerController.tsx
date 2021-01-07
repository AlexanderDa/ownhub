import React from "https://esm.sh/react@17.0.1";
import Entry from "../../../models/Entry.ts";
import ManagerPage, { ManagerOptions } from "./ManagerPage.tsx";

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
    await fetch(`/api/directory?query=${JSON.stringify({ path })}`)
      .then((res) => res.json())
      .then(({ path, files, folders }) => {
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
    fetch("/api/directory", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path }),
    })
      .then((res) => res.json())
      .then((data) => {
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
    //@ts-ignore
    this.loadDirectory(window.location.pathname.replace("/app", "") || "/");

    window.addEventListener("popstate", () => {
      //@ts-ignore
      this.loadDirectory(window.location.pathname.replace("/app", "") || "/");
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
