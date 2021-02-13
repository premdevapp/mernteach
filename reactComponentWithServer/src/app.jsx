const continents = ["Africa", "America", "Asia", "Australia", "Europe"];
const helloContinents = Array.from(continents, (c) => `Continent ${c}`);

const message = helloContinents.join(" ");
const element = (
  <div title="outer div">
    <h1>Helo {message}</h1>
  </div>
);
ReactDOM.render(element, document.querySelector(".contents"));
