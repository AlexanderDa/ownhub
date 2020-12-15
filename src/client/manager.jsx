import React from "https://dev.jspm.io/react@17.0.1";
import Icon from "./components/icon.jsx";

export default class Manager extends React.Component {
  /*****************************************************************
   *                             State                             *
   *****************************************************************/
  state = {
    name: "ownhum",
    path: "",
    folders: [],
    files: [],
  };

  /*****************************************************************
   *                          Constructor                          *
   *****************************************************************/
  constructor(props) {
    super(props);
  }

  /*****************************************************************
   *                           Services                            *
   *****************************************************************/
  async loadDirectory(path) {
    fetch(`/api/directory?query=${encodeURI(JSON.stringify({ path }))}`);
  }

  /*****************************************************************
   *                           Methods                             *
   *****************************************************************/

  changeRoute(path) {
    let newUrlIS = window.location.origin + "/user/profile/management";
    window.location.assign(newUrlIS);
  }

  onRouteChange() {
    window.onpopstate = function (event) {
      alert(
        "location: " +
          document.location +
          ", state: " +
          JSON.stringify(event.state)
      );
    };
  }

  /*****************************************************************
   *                             React                             *
   *****************************************************************/

  componentDidMount() {
    let path = window.location.pathname;
    path = path === "/app" ? "/" : path.replace("/app", "");
    this.loadDirectory(path);
    this.onRouteChange();
  }

  render() {
    return (
      <div>
        <Icon name="home" />
      </div>
    );
  }
}
