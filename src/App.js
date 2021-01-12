import { useState, useEffect } from "react";
import * as d3 from "d3";
import csvFile from "./data/military_expenditure.csv";
import { FIRST_YEAR, LAST_YEAR } from "./constants";
import DatesRangeSlider from "./components/DatesRangeSlider";

function App() {
  const [data, setData] = useState([]);
  const [datesRange, setDatesRange] = useState([FIRST_YEAR, LAST_YEAR]);

  useEffect(() => {
    d3.csv(csvFile).then((rawData) => {
      setData(
        rawData.map((item) => {
          const {
            Code: code,
            Name: label,
            Type,
            "Indicator Name": indicatorName,
            ...dates
          } = item;
          return {
            code: item.Code,
            label: item.Name,
            values: Object.keys(dates).map((key) => ({
              date: key,
              value: parseFloat(dates[key] || 0),
            })),
          };
        })
      );
    });
  }, []);

  return (
    <div className="App">
      <DatesRangeSlider updater={setDatesRange} />
    </div>
  );
}

export default App;
