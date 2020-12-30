import React from "https://esm.sh/react@17.0.1";
import ManagerPage, { ManagerOptions } from "./ManagerPage.tsx";

interface Stage extends ManagerOptions {}

export default class ManagerController extends React.Component<any, Stage> {
  public state: Stage = {
    search: "",
    directory: { path: "/", folders: [], files: [] },
  };

  constructor(props: any) {
    super(props);
    this.loadDirectory = this.loadDirectory.bind(this);
  }

  createFolder(name: string) {
    alert(name);
  }
  /*****************************************************************
   *                           Services                            *
   *****************************************************************/
  async loadDirectory(path: string): Promise<void> {
    await fetch(`/api/directory?query=${JSON.stringify({ path })}`)
      .then((res) => res.json())
      .then((directory) => {
        this.setState({ directory, search: "" });
      })
      .catch((err) => {
        console.error(err);
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
    const { search, directory } = this.state;
    return (
      <ManagerPage
        search={search}
        directory={directory}
        onSearch={(value) => this.setState({ search: value })}
        onChangePath={this.loadDirectory}
        createNewFolder={this.createFolder}
      />
    );
  }
}
