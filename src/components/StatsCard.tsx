import * as Icons from "@mui/icons-material";

const StatsIcon = ({ icon }: { icon: keyof typeof Icons }) => {
  const Icon = Icons[icon];
  return <Icon fontSize="large" color="primary" />;
};

interface IProps {
  text: string;
  title: string;
  icon: keyof typeof Icons;
}

export default function StatsCard(props: IProps): JSX.Element {
  return (
    <div className="shadow-md bg-white rounded flex flex-row items-center p-4 gap-3">
      <div className="bg-green-100 rounded-full p-4">
        {props.icon && <StatsIcon icon={props.icon} />}
      </div>
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">{props.text}</p>
        <p className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          {props.title}
        </p>
      </div>
    </div>
  );
}
