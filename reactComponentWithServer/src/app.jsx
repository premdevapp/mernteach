class HelloWorld extends React.Component {
  render() {
    const continents = ["Africa", "America", "Asia", "Australia", "Europe"];
    const helloContinents = Array.from(continents, (c) => `Continent ${c}!!!`);

    const message = helloContinents.join(" ");
    return (
      <div title="outer div">
        <h1>Helo {message}</h1>
      </div>
    );
  }
}
const element = <HelloWorld />;
ReactDOM.render(element, document.querySelector(".contents"));
