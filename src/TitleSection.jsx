import React from 'react';
import PokeballImage from './assets/Pokeball.png'
import PikachuImage from './assets/Pikachu.png'

function TitleSection({setPokemonName, searchPokemon, handleKeyDown}) {
    return (
        <div className="TitleSection">
            <div className="row">
              <img src={PokeballImage} alt="Pokeball" />
                <div className="column">
                <h1>Pokédex API</h1>
                <input type="text"
                onChange={(e) => {setPokemonName(e.target.value.toLowerCase())}}
                onKeyDown={handleKeyDown}
                placeholder='Enter the name of a Pokémon...'
                ></input>
                <button onClick={searchPokemon}>Search</button>
                </div>
              <img src={PikachuImage} alt="Pikachu"/>
            </div>
        </div>
    )
}

export default TitleSection;

