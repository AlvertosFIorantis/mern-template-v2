import React from "react";

function PassportValidation(props) {
  return (
    <ul>
      <li>
        {" "}
        {props.validations[0] ? "✔️" : "❌"} must be at least 5 characters
      </li>
      <li>
        {" "}
        {props.validations[1] ? "✔️" : "❌"} must contain a capital letter
      </li>
      <li> {props.validations[2] ? "✔️" : "❌"} must contain a number</li>
      <li>
        {" "}
        {props.validations[3] ? "✔️" : "❌"} must contain one of $&+,:;=?@#
      </li>
    </ul>
  );
}

export default PassportValidation;
