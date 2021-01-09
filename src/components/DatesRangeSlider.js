import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

function DatesRangeSlider(props) {
  return <Range min={1960} max={2018} onChange={props.updater} />;
}

export default DatesRangeSlider;
