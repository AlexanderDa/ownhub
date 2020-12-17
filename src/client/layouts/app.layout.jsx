import React from "https://dev.jspm.io/react@17.0.1";
import Breadcrumb from "../components/breadcrumb.jsx";
import Header from "../components/header.jsx";
import Icon from "../components/icon.jsx";

export default (props) => {
  const styles = {
    app: {
      backgroundColor: "red",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw",
    },

    container: {
      display: "block",
      height: "100%",
      padding: "10px 25px",
      color: "#0097fc",
      backgroundColor: "rgb(15, 126, 80)",
      overflowY: "auto",
    },
  };

  return (
    <div style={styles.app}>
      <Header />
      <Breadcrumb />
      <section style={styles.container}>
        <button tooltip="hello" tooltip-location="top">
          top
        </button>
        <br/><br/>
        <button tooltip="hello" tooltip-location="right">
          right
        </button>
        <br/><br/>
        <button tooltip="hello" tooltip-location="bottom">
          bottom
        </button>
        <br/><br/>
        <button tooltip="hello" tooltip-location="left">
          left
        </button>
      </section>
    </div>
  );
};
