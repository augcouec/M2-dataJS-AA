import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

function BarChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const formattedData = props.selectedCountries.length
      ? props.data
          .filter((country) => props.selectedCountries.includes(country.code))
          .map((country) => ({
            country: country.code,
            spending: Math.round(country.total / 1000000000),
            spendingColor: "hsl(227, 70%, 50%)",
          }))
      : [];
    setData(formattedData);
  }, [props.data, props.selectedCountries]);

  return (
    <div className="bar-chart">
      <ResponsiveBar
        data={data}
        keys={["spending"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Spending (billions $USD)",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

export default BarChart;
