import React, { useLayoutEffect } from "react";
import drawLine from "./draw_line_helper";

function Line(props) {
  // to useLayout einai san to use Effect apla alazei kai otan alazei kai to css kai genika to Dom gia afto den litouirgouse prin pou eixa to use Effect
  useLayoutEffect(() => {
    drawLine(
      document.getElementById(props.idStart),
      document.getElementById(props.idEnd),
      document.getElementById(props.id)
    );
  });

  return <div className="line" id={props.id} key={props.id}></div>;
}

export default Line;
