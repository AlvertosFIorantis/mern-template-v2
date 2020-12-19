import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./ChartSummary.css";
import { GetStatsGroupByStatus } from "../../_actions/actions/ChartSummary/GetStatsGroupBySatus";

import BarChart from "../../components/Charts/BarChart";

function ChartSummary(props) {
  useEffect(() => {
    props.GetStatsGroupByStatus();
  }, []);

  return <BarChart data={props.GetStatsGroupByStatusData} />;
}

const mapStateToProps = (state) => {
  return {
    GetStatsGroupByStatusData: state.chartSummary.statsGroupyByStatus,
  };
};

const mapDispatchToProps = {
  GetStatsGroupByStatus: GetStatsGroupByStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChartSummary);
