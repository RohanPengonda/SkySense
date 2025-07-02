import React from "react";

const Alerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div className="my-4 p-4 rounded bg-red-100 dark:bg-red-900/60">
      <h4 className="font-bold mb-2">Weather Alerts</h4>
      {alerts.map((alert, idx) => (
        <div key={idx} className="mb-2">
          <div className="font-semibold">{alert.event || "Alert"}</div>
          <div className="text-sm">{alert.description || "No description available."}</div>
        </div>
      ))}
    </div>
  );
};

export default Alerts; 