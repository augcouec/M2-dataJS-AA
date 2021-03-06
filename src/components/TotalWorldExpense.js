function TotalWorldExpense(props) {
  const worldTotal = props.data.reduce((total, country) => {
    total = total + country.total;
    return total;
  }, 0);
  return (
    <div className="total-world-expense">
      <span className="total-world-expense__title">
        Total spending in the world
      </span>
      <span className="total-world-expense__value">
        $ {(worldTotal / 1000000000).toFixed(2)} billions
      </span>
    </div>
  );
}

export default TotalWorldExpense;
