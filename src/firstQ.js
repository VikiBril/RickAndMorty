import React, { useEffect, useContext, useLayoutEffect, useState } from "react";
import "./App.css";

const FirstQuestion = () => {
  const [characters, setCharacters] = useState([]);
  const [origin, setOrigin] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [originDimension, setOriginDimention] = useState("");
  const [popularity, setPopularity] = useState("");

  useLayoutEffect(() => {
    try {
      fetch("https://rickandmortyapi.com/api/character")
        .then((res) => res.json())
        .then(({ results }) => {
          if (results && Array.isArray(results)) {
            setCharacters(results);
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }, []);

  let filteredCharacters = characters;
  let theMostUnPopularObj;

  if (characters) {
    filteredCharacters = filteredCharacters.filter(
      (c) => c.origin.name === "Earth (C-137)"
    );
    console.log("filteredCharacters", filteredCharacters);

    let inHowManyEpisodes = filteredCharacters;
    for (let i = 0; i < inHowManyEpisodes.length; i++) {
      for (let j = 1; j < inHowManyEpisodes.length; j++) {
        if (
          inHowManyEpisodes[i].episode.length >
          inHowManyEpisodes[j].episode.length
        ) {
          if (inHowManyEpisodes[i].id < inHowManyEpisodes[j].id) {
            //console.log("im i", inHowManyEpisodes[i].id);
            //console.log("im j", inHowManyEpisodes[j].id);
            theMostUnPopularObj = inHowManyEpisodes[j];
          }
        }
      }
    }
    //!!!!!!!!------ I know you expected to map/reduce function but i wasn't able to execute it as needed to receive at the end id=17 ----//

    // inHowManyEpisodes.reduce(function (prev, curr) {
    //   if (prev.id < curr.id) {
    //     if (prev.episode.length > curr.episode.length) {
    //       console.log("im curr", curr);
    //       return curr;
    //     } else {
    //       console.log("im prev", prev);
    //       return prev;
    //     }
    //   }
    // });
  }

  useEffect(() => {
    if (theMostUnPopularObj) {
      setCharacterName(theMostUnPopularObj.name);
      setOrigin(theMostUnPopularObj.origin.name);
      setPopularity(theMostUnPopularObj.episode.length);

      try {
        fetch(`${theMostUnPopularObj.origin.url}`)
          .then((res) => res.json())
          .then((result) => {
            if (result) {
              console.log("result", result);
              setOriginDimention(result.dimension);
            }
          })
          .catch((error) => console.log(error));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  // console.log("theMostUnPopularObj", theMostUnPopularObj.origin.url);
  //console.log("originDimension", originDimension);

  const handleCharacterName = (e) => {
    setCharacterName(theMostUnPopularObj.name);
  };

  const handleOrigin = () => {
    if (theMostUnPopularObj) {
      setOrigin(theMostUnPopularObj.origin.name);
    }
  };

  const handlePopularity = () => {
    setPopularity(theMostUnPopularObj.episode.length);
  };

  return (
    <div className="FirstQuestion">
      <h2> The Most unpopular character from Earth C-137</h2>
      <table>
        <thead>
          <tr>
            <th>Character name</th>
            <td>{characterName}</td>
          </tr>
          <tr>
            <th>Origin name</th>
            <td>{origin}</td>
          </tr>
          <tr>
            <th>Origin dimension</th>
            <td>{originDimension}</td>
          </tr>
          <tr>
            <th>Poplurity</th>
            <td>{popularity}</td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};
export default FirstQuestion;
