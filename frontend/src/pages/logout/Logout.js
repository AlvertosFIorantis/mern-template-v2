import React, { useEffect } from "react";
import {logOutUserAction} from "../../_actions/actions/Users/logOutUserAction"

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function Logout(props) {
  useEffect(() => {
    props.logOutUserAction(props.history);
  }, []);
  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
  };
};

const mapDispatchToProps = {
  // prepei na kano import sto conmponent to action pou thelo apo to actions.js file

  logOutUserAction: logOutUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));
