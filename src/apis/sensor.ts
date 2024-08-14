import { request } from "./request";
export default {
  getTempretureSensorData: ({
    metric,
    x_axis,
    store_id,
  }: {
    metric: string;
    x_axis: string;
    store_id: string;
  }) => {
    return request.post("/home/dynamic-info", {
      fields: ["sensor_data_type", "sensor_name"],
      filters: {
        store_id: [store_id],
        sensor_type: ["Temperature"],
        date_enqueued: "2024-05-28",
        sensor_data_type: ["Ambient"],
      },
      chart_metric: [{ metric, x_axis, y_axis: "value" }],
    });
  },
};
