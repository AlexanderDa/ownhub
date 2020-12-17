import React from "https://dev.jspm.io/react@17.0.1";
import Icon from "./icon.jsx";

export default (props) => {
  const styles = {
    toolbar: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "normal",
      alignContent: "stretch",
    },
    item: {
      display: "block",
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "auto",
      padding: "5px 50px",
      order: 0,
    },
  };
  return (
    <nav style={styles.toolbar}>
      <div style={styles.item}>OwnHub</div>
      <div style={styles.item}>
        <Icon tooltip="hello" tooltip-location="bottom" name="view_module" />
        <Icon tooltip="List view" tooltip-location="bottom" name="view_list" />
        <Icon tooltip="Upload" tooltip-location="bottom" name="cloud_upload" />
        <Icon
          tooltip="New folder"
          tooltip-location="bottom"
          name="create_new_folder"
        />
      </div>
    </nav>
  );
};
