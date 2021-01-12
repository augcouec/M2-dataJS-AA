import { useState, useEffect } from "react";
import * as d3 from "d3";
import csvFile from "./data/military_expenditure.csv";
import DatesRangeSlider from "./components/DatesRangeSlider";
import TotalWorldExpense from "./components/TotalWorldExpense";
import GeoChart from "./components/GeoChart";
import BarChart from "./components/BarChart";

const formatData = (rawData) => {
  return rawData.map((item) => {
    const {
      Code: code,
      Name: label,
      Type,
      "Indicator Name": indicatorName,
      ...dates
    } = item;

    const country = { code, label };

    country.expenses = Object.keys(dates).map((key) => ({
      date: parseFloat(key),
      value: parseFloat(dates[key] || 0),
    }));

    return country;
  });
};

const computeData = (data) => {
  return data.map((country) => {
    country.average = country.expenses.reduce(
      (total, expense, currentIndex, expenses) => {
        total = total + expense.value;
        if (expenses.length === currentIndex + 1) {
          if (total === 0) return total;
          const count = expenses.filter((exp) => exp.value > 0).length;
          return total / count;
        }
        return total;
      },
      0
    );

    country.total = country.expenses.reduce((total, expense) => {
      total = total + expense.value;
      return total;
    }, 0);

    return country;
  });
};

const updateDataRange = (data, datesRange) => {
  return data.map((country) => {
    const expenses = country.expenses.filter(
      (expense) =>
        expense.date >= datesRange[0] && expense.date <= datesRange[1]
    );
    return { ...country, expenses };
  });
};

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    d3.csv(csvFile).then((csv) => {
      const formattedData = formatData(csv);
      const computedData = computeData(formattedData);
      setData(computedData);
      setCurrentData(computedData);
      setLoading(false);
    });
  }, []);

  const updateDatesRange = (datesRange) => {
    const updatedData = updateDataRange(data, datesRange);
    const computedData = computeData(updatedData);
    setCurrentData(computedData);
  };

  const selectCountry = (event) => {
    if (!event.data) return;
    const countryCode = event.data.id;
    if (selectedCountries.includes(countryCode)) {
      const selectedCountriesClone = [...selectedCountries];
      selectedCountriesClone.splice(selectedCountries.indexOf(countryCode), 1);
      setSelectedCountries(selectedCountriesClone);
    } else {
      setSelectedCountries([...selectedCountries, countryCode]);
    }
  };

  return (
    <div className="app">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <DatesRangeSlider updater={updateDatesRange} />
          <TotalWorldExpense data={currentData} />
          <section className="charts">
            <GeoChart data={currentData} updater={selectCountry} />
            <BarChart
              data={currentData}
              selectedCountries={selectedCountries}
            />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
