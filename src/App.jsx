import { useState } from 'react'
import Axios from 'axios';
import './App.css'
import TitleSection from './TitleSection'
import DisplaySection from './DisplaySection';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "", 
    number: "",
    type_1: "",
    type_2: "",
    sprite: "",
    hp: "",
    attack: "",
    defense: "",
    specialattack: "",
    specialdefense: "",
    speed: "",
    default_img: "",
    shiny_img: "",
    flavor_text: "",
    genus: ""
  });

  const searchPokemon = () => {
    const modifiedPokemonName = pokemonName.split('-')[0];
    const request1 = Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    let request2 = Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    .catch(() => Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${modifiedPokemonName}`));
    setIsLoading(true)
    return Promise.all([request1, request2])
    .then(
    (responses) => {
      const response1 = responses[0].data;
      const response2 = responses[1].data;
      const randomNumber = Math.random();
      const img = randomNumber < 0.1 ? response1.sprites.other["official-artwork"].front_shiny : response1.sprites.other["official-artwork"].front_default;
      setPokemon({
        name: pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1), 
        number: "#" + response1.id,
        type_1: "type " + response1.types[0].type.name,
        type_2: response1.types[1] ? "type " + response1.types[1].type.name : null,
        sprite: response1.sprites.front_default,
        hp: response1.stats[0].base_stat,
        attack: response1.stats[1].base_stat,
        defense: response1.stats[2].base_stat,
        specialattack: response1.stats[3].base_stat,
        specialdefense: response1.stats[4].base_stat,
        speed: response1.stats[5].base_stat,
        img: img,
        flavor_text: "Description: " + getEnglishFlavorText(response2.flavor_text_entries),
        genus: "Genus: " + getEnglishGenus(response2.genera)
      });
      setPokemonChosen(true);
      setIsLoading(false)
      return { response1, response2 }
    }).catch(
    (error) => {
      console.error("Error fetching Pokemon data", error);
      setPokemonChosen(false);
    });
  };

  const getEnglishFlavorText = (flavor_text_entries) => {
    var englishFlavorText = "";
    var characterToRemove = "";

    for (var i = 0; i < flavor_text_entries.length; i++) {
      if (flavor_text_entries[i].language.name == "en") {
        englishFlavorText = flavor_text_entries[i].flavor_text;
        break;
      }
    }
    return englishFlavorText.split(characterToRemove).join(" ");
  }

  const getEnglishGenus = (genera) => {
    var englishGenus = "";

    for (var i = 0; i < genera.length; i++) {
      if (genera[i].language.name == "en") {
        englishGenus = genera[i].genus;
        break;
      }
    }
    return englishGenus;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPokemon();
    }
  };

  return (
    <>
      <div className="App">
        <TitleSection
          pokemonName={pokemonName}
          setPokemonName={setPokemonName}
          searchPokemon={searchPokemon}
          handleKeyDown={handleKeyDown}
          />
        <DisplaySection
          pokemon={pokemon}
          pokemonChosen={pokemonChosen}
          isLoading={isLoading}
          />
      </div>
    </>
  )
}

export default App
