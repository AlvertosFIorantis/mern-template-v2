import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./ChartSummary.css";
import { GetStatsGroupByStatus } from "../../_actions/actions/ChartSummary/GetStatsGroupBySatus";

function ChartSummary(props) {
  useEffect(() => {
    props.GetStatsGroupByStatus();
  }, []);

  return <div>Hellooooooooooooooooooooooooooooooo</div>;
}

const mapStateToProps = (state) => {
  return {
    GetStatsGroupByStatus: state.chartSummary.statsGroupyByStatus,
  };
};

const mapDispatchToProps = {
  GetStatsGroupByStatus: GetStatsGroupByStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartSummary);
