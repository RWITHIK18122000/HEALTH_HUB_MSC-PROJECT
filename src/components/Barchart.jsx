import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  //   Tooltip,
  Legend,
} from "recharts";
import { useMedication } from "../context/medicineContext";

export default function BarChartComponent() {
  const { weightData } = useMedication();
  return (
    <BarChart
      width={500}
      height={300}
      data={weightData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, 150]} />
      {/* <Tooltip /> */}
      <Legend />
      <Bar dataKey="weight" fill="#8884d8" />
    </BarChart>
  );
}
