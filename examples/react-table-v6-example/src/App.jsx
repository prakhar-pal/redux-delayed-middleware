import React from "react";
import { Provider } from "react-redux";
import "react-table-v6/react-table.css";
import PeopleList from "./components/PeopleList.jsx";
import configureStore from "./store/configureStore";
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PeopleList />
    </Provider>
  );
}
// import React from "react";
import { render } from "react-dom";
// import App from "./src/App.jsx";

render(<App />, document.getElementById("root"));
