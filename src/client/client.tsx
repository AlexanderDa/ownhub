import App from "./App.tsx";
import Box from "./components/Box.tsx";
import Icon from "./components/Icon.tsx";
import Dialog from "./components/Dialog.tsx";
import Button from "./components/Button.tsx";
import Viewer from "./components/Viewer.tsx";
import TextField from "./components/TextField.tsx";
import Breadcrumb from "./components/Breadcrumb.tsx";
import ManagerPage from "./views/manager/ManagerPage.tsx";
import Manager from "./views/manager/ManagerController.tsx";

export default `
const ManagerPage = ${ManagerPage};
const Manager = ${Manager};
const App = ${App};
const Box = ${Box};
const Icon = ${Icon};
const Dialog = ${Dialog};
const Button = ${Button};
const Viewer = ${Viewer};
const TextField = ${TextField};
const Breadcrumb = ${Breadcrumb};
`;
