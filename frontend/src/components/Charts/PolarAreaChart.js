import React from "react";
import { Polar } from "react-chartjs-2";

// an exo parapano values sto array diladi ala idi prject that exo aftomata kai ala xromata gia na ta xrisimopio
const staticListofColors = [
  "#AAE5E5",
  "#FDD3D6",
  "#3cba9f",
  "#e8c3b9",
  "#c45850",
];

function PolarAreaChart(props) {
  const ArrayLabels = [].concat(...props.data.map((x) => x._id));

  const ArrayData = [].concat(...props.data.map((x) => x.count));

  // array for colors so in every graph the type of project has always the same color gia paradigma to "In-progress" perni pada to prasion i kapio xroma An exo kai ala options apla ta prostheto sto sigkeirmeno const me extra if stamtents
  const ArrayColors = ArrayLabels.map((x) => {
    if (x === "in-work") {
      return staticListofColors[0];
    }
    if (x === "published") {
      return staticListofColors[1];
    }
  });

  const data = {
    labels: ArrayLabels,
    datasets: [
      {
        label: "Number of Projects",

        backgroundColor: ArrayColors,
        data: ArrayData,
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "PolarArea Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            // vazo +1 kai -1 gia na exoun ligo xoro ta diagramata alios tha fente to ena terastio kai to alo poli mikro
            min: Math.min.apply(Math, ArrayData) - 1,
            max: Math.max.apply(Math, ArrayData) + 1,
            stepSize: 1,
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: true,
  };
  return <Polar data={data} options={options} />;
}

export default PolarAreaChart;
