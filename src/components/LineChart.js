import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

function LineChart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const formattedData = props.selectedCountries.length
      ? props.data
          .filter((country) =>
            props.selectedCountries.find((c) => c.code === country.code)
          )
          .map((country) => ({
            id: country.label,
            data: country.expenses.map((expense) => ({
              x: expense.date,
              y: (expense.value / 1000000000).toFixed(2),
            })),
          }))
      : [];
    setData(formattedData);
  }, [props.data, props.selectedCountries]);

  return (
    <div className="chart line-chart">
      {data.length ? (
        <>
          <h2 className="chart__title">
            Evolution of spending by country (billion $)
          </h2>
          <ResponsiveLine
            data={data}
            margin={{ top: 30, right: 160, bottom: 60, left: 80 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
            }}
            enableGridX={false}
            enableGridY={false}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 15,
              tickRotation: -90,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 15,
              tickRotation: 0,
            }}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
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

export default LineChart;
