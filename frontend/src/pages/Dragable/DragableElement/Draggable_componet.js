import React, { useRef, useEffect } from "react";

function Draggable_componet(props) {
  const myComponent = useRef(null);
  useEffect(() => {
    const target = myComponent.current;
    let main = document.getElementById("main");
    let div1 = document.getElementById(`${props.id}`);
    console.log("main", main.offsetHeight);
    console.log("div1", div1.offsetHeight);
    // extra part to put the divs in their ineital position based on the value they had when they were saved
    div1.style.left = props.XCoordinates + "px";
    div1.style.top = props.YCoordinates + "px";
    // extra part to put the divs in their ineital position based on the value they had when they were saved
    if (!target) {
      return;
    }

    let pos1 = 0;
    let pos2 = 0;
    let pos3;
    let pos4;

    function onMousedown(e) {
      pos3 = e.clientX;
      pos4 = e.clientY;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(e) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // to pigene ela ginete apo to target.offsetTop - pos2 kai to target.offsetLeft - pos1 apla ta ala ta exo gia na min vgenoun ta divs ekso apo to parent container
      let top = target.offsetTop - pos2 > 0 ? target.offsetTop - pos2 : 0;
      let left = target.offsetLeft - pos1 > 0 ? target.offsetLeft - pos1 : 0;
      let maxTop = main.offsetHeight - div1.offsetHeight - 10;
      let maxLeft = main.offsetWidth - div1.offsetWidth - 10;
      top = top < maxTop ? top : maxTop;
      left = left < maxLeft ? left : maxLeft;
      target.style.top = top + "px";
      target.style.left = left + "px";
      props.setMyBoxesHelper(pos3);
    }

    function onMouseUp(e) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    target.addEventListener("mousedown", onMousedown);
    target.addEventListener("touchstart", onMousedown);

    return () => {
      target.removeEventListener("mousedown", onMousedown);
      target.removeEventListener("touchstart", onMousedown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("touchmove", onMouseMove);
    };
  }, []);

  return (
    <div className="dragableDiv" ref={myComponent} id={props.id}>
      <button
        onClick={() => props.StartConnection(props.id, myComponent.current)}
      >
        Click to start a connection
      </button>
      <button
        onClick={() => props.EndConnection(props.id, myComponent.current)}
      >
        Click to end a connection
      </button>
    </div>
  );
}

export default Draggable_componet;
