import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

function BarChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const formattedData = props.selectedCountries.length
      ? props.data
          .filter((country) =>
            props.selectedCountries.find((c) => c.code === country.code)
          )
          .sort((a, b) => (a.total > b.total ? 1 : -1))
          .map((country) => ({
            country: country.label,
            spending: (country.total / 1000000000).toFixed(2),
            color: props.selectedCountries.find((c) => c.code === country.code)
              .color,
          }))
      : [];
    setData(formattedData);
  }, [props.data, props.selectedCountries]);

  return (
    <div className="chart bar-chart">
      {data.length ? (
        <>
          <h2 className="chart__title">
            Total spending by country (billion $)
          </h2>
          <ResponsiveBar
            data={data}
            colors={(d) => d.data.color}
            keys={["spending"]}
            indexBy="country"
            margin={{ top: 30, right: 40, bottom: 45, left: 80 }}
            padding={0.3}
            axisBottom={{
              tickSize: 0,
              tickPadding: 15,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 15,
              tickRotation: 0,
            }}
            labelSkipHeight={10}
          />
        </>
      ) : (
        <p className="chart__empty-text">
          Select at least one country on the map
        </p>
      )}
    </div>
  );
}

export default BarChart;
