import React, { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";
import { UnitContext } from "../context/UnitContext";

const ForecastChart = ({ forecast }) => {
  const { unit } = useContext(UnitContext);
  const tempUnit = unit === "metric" ? "°C" : "°F";
  if (!forecast || forecast.length === 0) return null;
  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Temperature Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={forecast}>
          <XAxis dataKey="date" />
          <YAxis>
            <Label angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }}>
              {tempUnit}
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="temp_max" stroke="#f87171" name="Max Temp" />
          <Line type="monotone" dataKey="temp_min" stroke="#60a5fa" name="Min Temp" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart; 