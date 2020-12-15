import React from "https://dev.jspm.io/react@17.0.1";
import Breadcrumb from "../components/breadcrumb.jsx";
import Header from "../components/header.jsx";

export default (props) => {
  return (
    <div>
      <Header />
      <Breadcrumb />
    </div>
  );
};

export const AppLayoutDeps = `
const Breadcrumb = ${Breadcrumb};
const Header  = ${Header};
`;
