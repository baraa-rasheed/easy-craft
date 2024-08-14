import { DonutChart } from "./primitives/DonutChart";
import Card, { ICardProps } from "./Card";

interface IProps extends ICardProps {
  chartData: Array<{ name: string; value: string }>;
}

export default function DonutChartCard(props: IProps): JSX.Element {
  return (
    <Card text={props.text} title={props.title}>
      <DonutChart
        variant="pie"
        value={"value"}
        category={"name"}
        showLabel={true}
        data={props.chartData}
        className="mx-auto h-72"
      />
    </Card>
  );
}
