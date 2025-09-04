import startCase from "lodash/startCase";
import { IElement } from "../types/routes";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { XCircleIcon, XIcon } from "lucide-react";

export default function ErrorElement(element: Readonly<IElement>) {
  return (
    <Card className="h-full">
      <CardContent>

    <Alert variant={"destructive"}>
      <XCircleIcon />
      <AlertTitle>Oops!!</AlertTitle>
      <AlertDescription>
        Something went wrong while loading {startCase(element?.api?.key)}
      </AlertDescription>
    </Alert>
      </CardContent>
    </Card>
  );
}
