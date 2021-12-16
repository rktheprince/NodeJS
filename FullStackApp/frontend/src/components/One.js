import React, { Component } from "react";
import history from "./History";
// import { withRouter } from "react-router-dom";

class One extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  change = () => {
    history.push("/add");
  };

  render() {
    return (
      <div>
        <button onClick={this.change}>Done</button>
      </div>
    );
  }
}

export default One;
