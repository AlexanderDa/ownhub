import App from "./App.tsx";
import Box from "./components/Box.tsx";
import Icon from "./components/Icon.tsx";
import Dialog from "./components/Dialog.tsx";
import Button from "./components/Button.tsx";
import Viewer from "./components/Viewer.tsx";
import Dropzone from "./components/Dropzone.tsx";
import Uploader from "./components/Uploader.tsx";
import TextField from "./components/TextField.tsx";
import Breadcrumb from "./components/Breadcrumb.tsx";
import UploadPanel from "./components/UploadPanel.tsx";
import ManagerPage from "./views/manager/ManagerPage.tsx";
import Manager from "./views/manager/ManagerController.tsx";
import { byteToString } from "../utils/path.ts";
import { recordHistory } from "./utils/browser.ts";
import { pathFromBrowser } from "./utils/browser.ts";

export default Manager;

export const BundleJS = `
const App = ${App};
const Box = ${Box};
const Icon = ${Icon};
const Dialog = ${Dialog};
const Button = ${Button};
const Viewer = ${Viewer};
const Manager = ${Manager};
const Dropzone = ${Dropzone};
const Uploader = ${Uploader};
const TextField = ${TextField};
const Breadcrumb = ${Breadcrumb};
const UploadPanel = ${UploadPanel};
const ManagerPage = ${ManagerPage};
const byteToString = ${byteToString};
const recordHistory = ${recordHistory};
const pathFromBrowser = ${pathFromBrowser};
`;
