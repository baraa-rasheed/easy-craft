import * as Icons from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const StatsIcon = ({ icon }: { icon: keyof typeof Icons }) => {
  const Icon = Icons[icon];
  return <Icon className="text-primary" />;
};

interface IProps {
  text: string;
  title: string;
  icon: keyof typeof Icons;
}

export default function StatsCard(props: Readonly<IProps>): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.text}</CardDescription>
        <CardAction>
          <StatsIcon icon={props.icon} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
