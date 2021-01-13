import { ResponsiveChoropleth } from "@nivo/geo";
import GeoChartFeatures from "./GeoChartFeatures.json";

function GeoChart(props) {
  const data = props.data.map((country) => ({
    id: country.code,
    value: Math.round(country.total / 1000000000),
  }));

  return (
    <div className="chart geo-chart">
      <ResponsiveChoropleth
        data={data}
        onClick={props.updater}
        features={GeoChartFeatures.features}
        colors="nivo"
        domain={[0, 1000]}
        label="properties.name"
        borderWidth={0.5}
      />
    </div>
  );
}

export default GeoChart;
