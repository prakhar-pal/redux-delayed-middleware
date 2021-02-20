import React from "react";
import { Provider } from "react-redux";
import "react-table-v6/react-table.css";
import PeopleList from "./components/PeopleList";
import configureStore from "./store/configureStore";
const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PeopleList />
    </Provider>
  );
}

export default App;
