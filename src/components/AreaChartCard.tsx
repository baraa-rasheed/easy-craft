import React from "react";

import { AreaChart, TooltipProps } from "./primitives/AreaChart";
import Card, { ICardProps } from "./Card";

interface IProps extends ICardProps {
  chartData: Array<{ date: string; value: string }>;
}

export default function AreaChartCard(props: IProps) {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null);
  const titleFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number)}`;

  const payload = datas?.payload?.[0];
  const value = payload?.value??0;

  const formattedValue = payload
    ? titleFormatter(value)
    : titleFormatter(+props.chartData[props.chartData.length - 1].value);

  return (
    <Card title={formattedValue} text={props.text}>
      <AreaChart
        index="date"
        data={props.chartData}
        categories={["value"]}
        showLegend={false}
        showYAxis={false}
        startEndOnly
        className="h-72"
        tooltipCallback={(props) => {
          if (props.active) {
            setDatas((prev) => {
              if (prev?.label === props.label) return prev;
              return props;
            });
          } else {
            setDatas(null);
          }
          return null;
        }}
      />
    </Card>
  );
}
