import React from 'react'

function DisplaySection({pokemonChosen, pokemon, isLoading}) {
    return (
        <div className="DisplaySection">
              {!pokemonChosen ? (<h1>Please choose a Pokémon</h1>
              ) : (isLoading ? (<h1>Loading...</h1>) :
                <>
                <div className="row">
                <div className="column">
                  <div className="row">
                    <img src={pokemon.sprite} />
                    <h3>{pokemon.number}</h3>
                    <h1>{pokemon.name}</h1>
                  </div>
                <div className="row">
                  <span class={pokemon.type_1}></span>
                  <span class={pokemon.type_2}></span>
                </div>
                <img src={pokemon.img} />
                </div>
                <div className="column">
                <h4>{pokemon.genus}</h4>
                <h4>{pokemon.flavor_text}</h4>
                <table>
                  <tr>
                    <td className="Bold">Stat</td>
                    <td className="Bold">Value</td>
                  </tr>
                  <tr>
                    <td>HP</td>
                    <td>{pokemon.hp}</td>
                  </tr>
                  <tr>
                    <td>Attack</td>
                    <td>{pokemon.attack}</td>
                  </tr>
                  <tr>
                    <td>Defense</td>
                    <td>{pokemon.defense}</td>
                  </tr>
                  <tr>
                    <td>Special Attack</td>
                    <td>{pokemon.specialattack}</td>
                  </tr>
                  <tr>
                    <td>Special Defense</td>
                    <td>{pokemon.specialdefense}</td>
                  </tr>
                  <tr>
                    <td>Speed</td>
                    <td>{pokemon.speed}</td>
                  </tr>
                </table>
                </div>
                </div>
                </>
                )}
          </div>
    )
}

export default DisplaySection;