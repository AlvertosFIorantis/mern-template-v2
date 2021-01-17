import React, { useState, useEffect } from "react";
import "./Dragable.css";
import Draggable_componet from "./DragableElement/Draggable_componet";
import Line from "./DragableElement/Line";

export default function Dragable() {
  const [myboxes, setMyBoxes] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ]);
  const [connectionArray, setConnectionArray] = useState([]);
  const [startConnectionState, setStartConnectionState] = useState("");
  const [endConnectionState, setEndConnectionState] = useState("");
  const [StartingRef, setStartingRef] = useState(null);
  const [EndingRef, setEndingRef] = useState(null);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const [test, setTest] = useState("");
  const setMyBoxesHelper = (item) => {
    setTest(item);
  };

  const StartConnectionHelper = (id, ref) => {
    setStartConnectionState(id);

    setStartingRef(ref);
    console.log(test);
  };

  const EndConnectionHelper = (id, ref) => {
    setEndConnectionState(id);

    setEndingRef(ref);
  };

  const CreateDivHandler = () => {
    let arrayLength = myboxes.length;
    console.log(arrayLength);
    const newBox = new Object();
    newBox.id = arrayLength + 1;
    setMyBoxes((prevState) => {
      let state = JSON.parse(JSON.stringify(prevState));

      state.push(newBox);
      console.log("state", state);

      return state;
    });
  };

  useEffect(() => {
    const connection = new Object();
    connection.Start = startConnectionState;
    connection.End = endConnectionState;
    connection.StartingRef = StartingRef;
    connection.EndingRef = EndingRef;

    setConnectionArray((prevState) => {
      let state = [...prevState, connection];
      console.log(state);
      state = state.filter(function (event) {
        return event.Start !== "";
      });
      return state.filter(onlyUnique);
    });
  }, [endConnectionState]);
  return (
    <div className="dragable_container">
      <div className="glass">
        <div className="sidePanelDragable">
          <button className="buttonDragable" onClick={CreateDivHandler}>
            Create Div
          </button>
        </div>
        <div className="DragableArea" id="main">
          {/* to id main to thelo gia to dragable componet gia na litourgisi olo to logic an alakso edo to main prepei na pao kai sto dragable compomnetn gia na to alakso !!!!!! */}
          {connectionArray.map((connection) => (
            <Line
              id={`${connection.Start}-${connection.End}`}
              idStart={connection.Start}
              idEnd={connection.End}
              lineTes={test}
            />
            // an xrisimoipio to dragLine compoent prpepe ina exo StartingRef adi gia Start
          ))}
          {myboxes.map((box) => (
            <Draggable_componet
              StartConnection={StartConnectionHelper}
              EndConnection={EndConnectionHelper}
              setMyBoxesHelper={setMyBoxesHelper}
              id={box.id}
            />
            // an xrisimoipio to dragLine compoent prpepe ina exo StartingRef adi gia Start
          ))}
        </div>
      </div>
    </div>
  );
}
