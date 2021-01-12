import { useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { FIRST_YEAR, LAST_YEAR } from "../data/constants";

function DatesRangeSlider(props) {
  const [datesRange, setDatesRange] = useState([FIRST_YEAR, LAST_YEAR]);

  const marks = {};
  marks[FIRST_YEAR] = FIRST_YEAR;
  marks[LAST_YEAR] = LAST_YEAR;

  return (
    <div className="dates-range">
      <Range
        min={FIRST_YEAR}
        max={LAST_YEAR}
        defaultValue={[FIRST_YEAR, LAST_YEAR]}
        marks={marks}
        onChange={(dates) => {
          setDatesRange(dates);
          props.updater(dates);
        }}
        allowCross={false}
      />
      <div className="dates-range__dates">
        <span className="dates-range__date">{datesRange[0]}</span>
        <span className="dates-range__date">{datesRange[1]}</span>
      </div>
    </div>
  );
}

export default DatesRangeSlider;
