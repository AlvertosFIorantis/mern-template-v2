import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./ChartSummary.css";
import { GetStatsGroupByStatus } from "../../_actions/actions/ChartSummary/GetStatsGroupBySatus";

import BarChart from "../../components/Charts/BarChart";
import DoughnutChart from "../../components/Charts/DougnuntChart";
import Pie from "../../components/Charts/PieChart";
import PolarAreaChart from "../../components/Charts/PolarAreaChart";

function ChartSummary(props) {
  useEffect(() => {
    props.GetStatsGroupByStatus();
  }, []);

  return (
    <div className="container__grid">
      <div className="box">
        <BarChart data={props.GetStatsGroupByStatusData} />
      </div>

      <div className="box">
        <DoughnutChart data={props.GetStatsGroupByStatusData} />
      </div>
      <div className="box">
        <Pie data={props.GetStatsGroupByStatusData} />
      </div>
      <div className="box">
        <PolarAreaChart data={props.GetStatsGroupByStatusData} />
      </div>
    </div>
  );
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
