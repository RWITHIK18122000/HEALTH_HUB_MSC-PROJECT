import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  //   CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useMedication } from "../context/medicineContext";

export default function LineChartComponent() {
  const { weightData } = useMedication();

  return (
    <LineChart
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
      {/* <CartesianGrid strokeDasharray="1 1" /> */}
      <XAxis dataKey="date" tickFormatter={(date) => date.slice(5, 10)} />
      <YAxis domain={[0, 150]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="weight"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
