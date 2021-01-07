import React from "https://esm.sh/react@17.0.1";
import { pathFromBrowser } from "../utils/browser.ts";
import { byteToString } from "../../utils/path.ts";
import axios from "https://esm.sh/axios@0.21.1";
import Entry from "../../models/Entry.ts";
import Button from "./Button.tsx";
import Icon from "./Icon.tsx";

interface Props {
  file: File;
  onRemove: () => void;
  uploaded: (path: string, entry: Entry) => void;
}

interface State {
  progressSize: string;
  progressPercentage: string;
}

export default class Uploader extends React.Component<Props, State> {
  public state: State = {
    progressSize: "",
    progressPercentage: "",
  };

  componentDidMount(): void {
    this.upload();
  }

  private async upload(): Promise<void> {
    const { file, uploaded } = this.props;

    const path = pathFromBrowser();

    const form: FormData = new FormData();
    form.set("files", file);

    await axios
      .post(`/api/upload${path}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ loaded, total }: ProgressEvent) => {
          const progressPercentage = `${Math.round((loaded * 100) / total)}%`;
          const progressSize = `${byteToString(loaded)} / ${byteToString(
            total
          )}`;

          this.setState({ progressPercentage, progressSize });
        },
      })
      .then((res) => uploaded(path, res.data));
  }

  public render(): JSX.Element {
    const { file, onRemove } = this.props;
    const { progressSize, progressPercentage } = this.state;

    return (
      <div
        className={`flex flex-row shadow-sm rounded p-2 w-full ${
          progressPercentage === "100%" ? "bg-green-50" : "bg-white"
        }`}
      >
        <div
          className={`flex items-center justify-center flex-shrink-0 h-10 w-10 rounded-xl text-gray-500 ${
            progressPercentage === "100%" ? "bg-green-100" : "bg-gray-100"
          }`}
        >
          <Icon
            name="file"
            className={
              progressPercentage === "100%" ? "text-green-500" : "text-gray-500"
            }
          />
        </div>
        <div className="flex flex-col flex-grow ml-4">
          <div
            className="text-sm font-semibold text-gray-600"
            style={{ overflowWrap: "anywhere" }}
          >
            {file.name}
          </div>
          <div className="shadow w-full bg-gray-50">
            <div
              className={`text-xs leading-none py-0.5 ${
                progressPercentage === "100%" ? "bg-green-400" : "bg-blue-400"
              }`}
              style={{ width: progressPercentage }}
            />
          </div>
          <div className="flex justify-between text-sm font-light text-gray-500">
            <span>{progressSize}</span> <span> {progressPercentage}</span>
          </div>
        </div>
        <div className={progressPercentage === "100%" ? "" : "hidden"}>
          <Button icon="close" onClick={onRemove} />
        </div>
      </div>
    );
  }
}
