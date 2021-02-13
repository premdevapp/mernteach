const element = React.createElement(
  "div",
  { title: "Outer div" },
  React.createElement("h1", null, "Hello world")
);
ReactDOM.render(element, document.querySelector(".contents"));
