import React from "https://dev.jspm.io/react@17.0.1";
import Icon from './icon.jsx'

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
      order: 0,
    }};
  return (
    <nav style={styles.toolbar}>
      <div style={styles.item}>
        <Icon name="home"/>
      </div>
      <div style={styles.item}>{props.actions}</div>
    </nav>
  );
};
