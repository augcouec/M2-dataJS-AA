function SelectedCountries(props) {
  return (
    <div className="selected-countries">
      {props.countries.map((country, index) => (
        <div
          key={index}
          className="selected-countries__country"
          style={{ backgroundColor: country.color }}
        >
          {country.label}
          <span
            className="selected-countries__cross"
            onClick={() => {
              props.updater({ data: { id: country.code } });
            }}
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
}

export default SelectedCountries;
