import { BarChart } from "./primitives/BarChart";
import Card from "./Card";

const chartdata = [
  {
    name: "Topic 1",
    "Group A": 890,
    "Group B": 338,
    "Group C": 538,
    "Group D": 396,
    "Group E": 138,
    "Group F": 436,
  },
  {
    name: "Topic 2",
    "Group A": 289,
    "Group B": 233,
    "Group C": 253,
    "Group D": 333,
    "Group E": 133,
    "Group F": 533,
  },
  {
    name: "Topic 3",
    "Group A": 380,
    "Group B": 535,
    "Group C": 352,
    "Group D": 718,
    "Group E": 539,
    "Group F": 234,
  },
  {
    name: "Topic 4",
    "Group A": 289,
    "Group B": 233,
    "Group C": 253,
    "Group D": 333,
    "Group E": 133,
    "Group F": 533,
  },
  {
    name: "Topic 5",
    "Group A": 289,
    "Group B": 233,
    "Group C": 253,
    "Group D": 333,
    "Group E": 133,
    "Group F": 533,
  },
  {
    name: "Topic 6",
    "Group A": 790,
    "Group B": 698,
    "Group C": 528,
    "Group D": 733,
    "Group E": 861,
    "Group F": 653,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function BarChartCard() {
  return (
    <Card>
      <BarChart
        data={chartdata}
        index="name"
        className="h-72"
        categories={[
          "Group A",
          "Group B",
          "Group C",
          "Group D",
          "Group E",
          "Group F",
        ]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}
