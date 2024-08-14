import apis from "../apis";
import helpers from "../helpers";
import components from "../components";
import { HTMLInputTypeAttribute } from "react";

export type ApiKey = keyof typeof apis;
export type HelperKey = keyof typeof helpers;
export type ComponentKey = keyof typeof components;
export type PropType = "textField" | "icon" | "select";

export const getElementProps = (
  elementProps: Array<{
    value: string;
    type: PropTypes;
    key: string;
  }>,
) => {
  const props = {} as any;
  Object.values(elementProps).forEach((prop) => {
    props[prop.key] = prop.value;
  });
  return props;
};

type PropTypes = Partial<{
  select: {
    label: string;
    options: Array<{ key: string; label: string }>;
  };
  textField: {
    label: string;
    type: HTMLInputTypeAttribute;
  };
  icon: {
    label: string;
  };
}>;

type ComponentPropConfig<K extends ComponentKey> = {
  value: any;
  type: PropTypes;
  disableUserInteraction?: boolean;
  key: keyof React.ComponentProps<(typeof components)[K]>;
};

type IAPIS = Partial<{
  [K in ApiKey]: {
    key: K;
    title: string;
    description: string;
    responseKey?: string;
    helperKey?: HelperKey;
    data: Array<{
      key: string;
      label: string;
      options: Array<{ key: string; label: string }>;
    }>;
    responseToProps: Record<string, string>;
  };
}>;

export type IComponents = Partial<{
  [K in ComponentKey]: {
    element: K;
    props: Partial<
      Record<
        keyof React.ComponentProps<(typeof components)[K]>,
        ComponentPropConfig<K>
      >
    >;
    apis: IAPIS;
  };
}>;

export const CMS_COMPONENTS: IComponents = {
  StatsCard: {
    element: "StatsCard",
    props: {
      title: {
        key: "title",
        type: {
          textField: {
            type: "text",
            label: "Card Title",
          },
        },
        value: "Title here",
      },
      text: {
        key: "text",
        type: {
          textField: {
            type: "text",
            label: "Card Text",
          },
        },
        value: "Text here",
      },
      icon: {
        key: "icon",
        type: {
          icon: {
            label: "Card Icon",
          },
        },
        value: "Coffee",
      },
    },
    apis: {},
  },
  DonutChartCard: {
    element: "DonutChartCard",
    props: {
      title: {
        key: "title",
        type: {
          textField: {
            type: "text",
            label: "Card Title",
          },
        },
        value: "Pie Chart",
      },
      text: {
        key: "text",
        type: {
          textField: {
            type: "text",
            label: "Card Text",
          },
        },
        value: "Text here",
      },
      chartData: {
        key: "chartData",
        type: {
          textField: {
            type: "text",
            label: "Card Text",
          },
        },
        disableUserInteraction: true,
        value: [
          {
            name: "SolarCells",
            value: 4890,
          },
          {
            name: "Glass",
            value: 2103,
          },
          {
            name: "JunctionBox",
            value: 2050,
          },
          {
            name: "Adhesive",
            value: 1300,
          },
          {
            name: "BackSheet",
            value: 1100,
          },
          {
            name: "Frame",
            value: 700,
          },
          {
            name: "Encapsulant",
            value: 200,
          },
        ],
      },
    },
    apis: {
      getTempretureSensorData: {
        helperKey: "formatChartData",
        key: "getTempretureSensorData",
        title: "Get Tempreture Sensor Data",
        responseToProps: { chartData: "chartData" },
        description: "This will show the Temp sensor Information",
        data: [],
      },
    },
  },
  AreaChartCard: {
    element: "AreaChartCard",
    props: {
      title: {
        key: "title",
        disableUserInteraction: true,
        type: {
          textField: {
            type: "text",
            label: "Card Title",
          },
        },
        value: "Pie Chart",
      },
      text: {
        key: "text",
        type: {
          textField: {
            type: "text",
            label: "Card Text",
          },
        },
        value: "Text here",
      },
      chartData: {
        key: "chartData",
        type: {
          textField: {
            type: "text",
            label: "Card Text",
          },
        },
        disableUserInteraction: true,
        value: [
          {
            date: "Jan 23",
            value: 2340,
          },
          {
            date: "Feb 23",
            value: 3110,
          },
          {
            date: "Mar 23",
            value: 4643,
          },
          {
            date: "Apr 23",
            value: 4650,
          },
          {
            date: "May 23",
            value: 3980,
          },
          {
            date: "Jun 23",
            value: 4702,
          },
          {
            date: "Jul 23",
            value: 5990,
          },
          {
            date: "Aug 23",
            value: 5700,
          },
          {
            date: "Sep 23",
            value: 4250,
          },
          {
            date: "Oct 23",
            value: 4182,
          },
          {
            date: "Nov 23",
            value: 3812,
          },
          {
            date: "Dec 23",
            value: 4900,
          },
        ],
      },
    },
    apis: {
      getTempretureSensorData: {
        helperKey: "formatChartData",
        key: "getTempretureSensorData",
        title: "Get Tempreture Sensor Data",
        responseToProps: { chartData: "chartData" },
        description: "This will show the Temp sensor Information",
        data: [
          {
            key: "x_axis",
            label: "X-Axis",
            options: [
              { key: "date", label: "Date" },
              { key: "store_id", label: "Store Id" },
            ],
          },
          {
            key: "metric",
            label: "Y-Axis",
            options: [
              { key: "avg", label: "Avarege for Ambient" },
              { key: "median", label: "Median for Ambient" },
              { key: "max", label: "Max for Ambient" },
              {
                key: "avg_percentage",
                label: "avareage percentage for Ambient",
              },
            ],
          },
        ],
      },
    },
  },
  TableCard: {
    element: "TableCard",
    props: {},
    apis: {},
  },
  BarChartCard: {
    element: "BarChartCard",
    props: {},
    apis: {},
  },
};
