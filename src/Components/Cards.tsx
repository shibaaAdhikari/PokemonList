// Cards.tsx
import React, { useEffect, useState } from "react";
import "../style.css";

interface CardsProps {
  pokemonList: { name: string; url: string }[];
  getPokemonImage: (pokemon: { url: string }) => string;
}

const Cards: React.FC<CardsProps> = ({ pokemonList, getPokemonImage }) => {
  return (
    <div className="cards-container flex flex-wrap justify-center items-center">
      {pokemonList.map((pokemon) => {
        const imageUrl = getPokemonImage(pokemon);

        return (
          <div
            key={pokemon.name}
            className="pokemon-card bg-white rounded p-4 m-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={`${pokemon.name} sprite`}
              className="w-40"
            />
            <h3 className="text-center text-lg font-bold">{pokemon.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
