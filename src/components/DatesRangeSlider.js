import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { FIRST_YEAR, LAST_YEAR } from "../constants";

function DatesRangeSlider(props) {
  return <Range min={FIRST_YEAR} max={LAST_YEAR} onChange={props.updater} />;
}

export default DatesRangeSlider;
