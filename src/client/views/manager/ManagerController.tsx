import React from "https://esm.sh/react@17.0.1";
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
        createNewFolder={this.createFolder}
      />
    );
  }
}
