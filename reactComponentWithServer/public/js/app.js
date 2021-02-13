"use strict";

var continents = ["Africa", "America", "Asia", "Australia", "Europe"];
var helloContinents = Array.from(continents, function (c) {
  return "Continent ".concat(c);
});
var message = helloContinents.join(" ");
var element = /*#__PURE__*/React.createElement("div", {
  title: "outer div"
}, /*#__PURE__*/React.createElement("h1", null, "Helo ", message));
ReactDOM.render(element, document.querySelector(".contents"));