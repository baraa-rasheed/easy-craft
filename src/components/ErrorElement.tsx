import startCase from "lodash/startCase";
import { useAsyncError } from "react-router-dom";
import { IElement } from "../types/routes";
import { Callout } from "../components/primitives/Callout";
import { RiErrorWarningFill } from "@remixicon/react";
import Card from "./Card";

export default function ErrorElement(element: IElement) {
  const error = useAsyncError();
  console.log(error);
  return (
    <Card>
      <Callout
        variant="error"
        className="w-full"
        icon={RiErrorWarningFill}
        title="Something went wrong"
      >
        Something went wrong while loading data {startCase(element?.api?.key)}
      </Callout>
    </Card>
  );
}
