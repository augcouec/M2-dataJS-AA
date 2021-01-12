function TotalWorldExpense(props) {
  const worldTotal = props.data.reduce((total, country) => {
    total = total + country.total;
    return total;
  }, 0);
  return (
    <div className="total-world-expense">
      <span className="total-world-expense__title">
        Dépenses totales dans le monde
      </span>
      <span className="total-world-expense__value">
        ${Math.round(worldTotal / 1000000000)} milliards
      </span>
    </div>
  );
}

export default TotalWorldExpense;
