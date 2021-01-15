function SelectedCountries(props) {
  return (
    <div className="selected-countries">
      {props.countries.map((country, index) => (
        <div key={index} className="selected-countries__country">
          {country.label}
          <span
            className="selected-countries__cross"
            onClick={() => {
              props.updater({ data: { id: country.code } });
            }}
          >
            &#215;
          </span>
        </div>
      ))}
    </div>
  );
}

export default SelectedCountries;
