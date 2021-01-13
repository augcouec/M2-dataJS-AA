import { ResponsiveChoropleth } from "@nivo/geo";
import GeoChartFeatures from "./GeoChartFeatures.json";

function GeoChart(props) {
  const data = props.data
    .filter((country) => country.code !== "WLD")
    .map((country) => ({
      id: country.code,
      value: Math.round(country.average / 1000000000),
    }));

  return (
    <div className="chart geo-chart">
      <h2 className="chart__title">
        Average of spending by country (billion $)
      </h2>
      <ResponsiveChoropleth
        data={data}
        onClick={props.updater}
        features={GeoChartFeatures.features}
        colors="nivo"
        domain={[
          0,
          Math.max.apply(
            Math,
            data.map((d) => d.value)
          ),
        ]}
        label="properties.name"
        borderWidth={0.5}
        valueFormat=".2s"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#444444",
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default GeoChart;
