import React from "https://esm.sh/react@17.0.1";
import ManagerPage, { ManagerOptions } from "./ManagerPage.tsx";

interface Stage extends ManagerOptions {}

export default class ManagerController extends React.Component<any, Stage> {
  public state: Stage = {
    search: "",
    directory: { path: "/Downloads", folders: [], files: [] },
  };

  search(value: any) {
    console.log(value);
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
        this.setState({ directory });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /*****************************************************************
   *                             React                             *
   *****************************************************************/
  public componentDidMount(): void {
    this.loadDirectory(this.state.directory.path);
  }
  render() {
    const { search, directory } = this.state;
    return (
      <div>
        {search}
        <ManagerPage
          search={search}
          directory={directory}
          onSearch={(value) => this.setState({ search: value })}
          createNewFolder={this.createFolder}
        />
      </div>
    );
  }
}
