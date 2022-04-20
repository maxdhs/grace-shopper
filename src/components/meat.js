const Meat = ({ meats, cow, gnarwall, bison }) => {
  console.log(meats);
  return (
    <>
      <h1>We have the meats</h1>
      <select name="meatlist" id="meatlist">
        <option value="" Please Select Meat></option>
        <option value="" Cow></option>
        <option value="" Gnarwall></option>
        <option value="" Bison></option>
      </select>
      <div>
        {meats.map((meat) => {
          console.log(meat);
          return (
            <div key={meat.id}>
              <h2>{meat.species}</h2>

              <p>{meat.image}</p>
              <p> {meat.description}</p>
              <p>{meat.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Meat;
