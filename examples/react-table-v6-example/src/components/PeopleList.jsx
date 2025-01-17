import ReactTable from "react-table-v6";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateName } from "../utils";
import { getPeople, updatePeople } from "../store/actions/peopleActions";

const columns = [
  {
    Header: "Name",
    Cell: (row) => {
      const { updatingIndex } = this.state;
      const { id, name } = row.original;
      return <div>{updatingIndex[id] ? "..." : name}</div>;
    },
  },
  {
    Header: "Age",
    accessor: "age",
  },
  {
    Header: "Gender",
    accessor: "sex",
  },
  {
    Header: "Degree",
    accessor: "degree",
  },
  {
    Header: "Weather",
    accessor: "weather",
  },
  {
    Header: "Friend",
    accessor: "friend",
  },
  {
    Header: "",
    Cell: ({ original }) => {
      const { updatingIndex } = this.state;
      const { id } = original;
      return updatingIndex[id] ? (
        <span className="btn btn-danger w-100"></span>
      ) : (
        "x"
      );
    },
  },
];
class PeopleList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updatingIndex: {},
    };
    this.columns = columns;
  }

  componentDidMount() {
    const { getPeople } = this.props;
    getPeople(100);
  }

  updateAll() {
    const { people, updatePeople } = this.props;
    people.forEach((person) => {
      updateName(person).then((newPerson) => updatePeople(newPerson));
    });
  }
  render() {
    const { people: data } = this.props;
    return (
      <div className="container h-75">
        <button onClick={this.updateAll} className="btn btn-primary mx-0 my-3">
          {" "}
          Update All
        </button>
        <ReactTable columns={this.columns} data={data} pageSize={100} />
      </div>
    );
  }
}

const appState = (state) => ({
  people: state.people,
});

const appActions = (dispatch) =>
  bindActionCreators(
    {
      getPeople,
      updatePeople,
    },
    dispatch,
  );

export default connect(appState, appActions)(PeopleList);
