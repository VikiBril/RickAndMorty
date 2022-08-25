import * as ReactDOM from "react-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Chart from "./BarChart";
import "./App.css";

const SecondQuestion = () => {
  const arrayOfCharacters = [
    { name: "Rick Sanchez" },
    { name: "Summer Smith" },
    { name: "Morty Smith" },
    { name: "Beth Smith" },
    { name: "Jerry Smith" },
  ];

  let datafiltered;
  const [data, setData] = useState("");
  const maxLength = 100;
  const chartHeight = maxLength + 20;
  const barWidth = 50;
  const barMargin = 30;
  //const numberOfBars = data.length;

  const arrayOfIdAndPoplurity = [];
  useLayoutEffect(() => {
    try {
      fetch("https://rickandmortyapi.com/api/character")
        .then((res) => res.json())
        .then(({ results }) => {
          if (results && Array.isArray(results)) {
            datafiltered = results.filter(
              (character) =>
                character.name.includes("Rick Sanchez") ||
                character.name.includes("Summer Smith") ||
                character.name.includes("Morty Smith") ||
                character.name.includes("Beth Smith") ||
                character.name.includes("Jerry Smith")
            );
            console.log("resultsQ2", datafiltered);
            setData(datafiltered);
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }, []);

  //console.log("data", datafiltered);

  const Chart = ({ children, width, height }) => (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="70%"
      preserveAspecRatio="xMidYMax meet"
    >
      {children}
    </svg>
  );
  const Bar = ({ x, y, width, height, characterName }) => (
    <>
      <rect x={x} y={y} width={width} height={height} fill={"black"} />
      <text x={x + width / 3} y={y - 5}>
        {`${height}`}
      </text>
    </>
  );
  return (
    <>
      <p className="legend">
        <span className="character">Character</span>
      </p>

      <Chart>
        {/* <rect x="0" y="200" width="50" height="100"></rect> */}
        {/* {datafiltered.map((character, index) => {
          const barHeight = data.episode.length;
          return (
            <Bar
              key={data.name}
              x={index * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
              character={character}
            />
          );
        })} */}
      </Chart>
    </>
  );
};
export default SecondQuestion;
