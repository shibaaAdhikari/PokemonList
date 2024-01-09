// Cards.tsx
import React, { useEffect, useState } from "react";
import { fetchData } from "../API/apiUtils";
import type { PokemonDetails } from "../API/apiUtils";
import "../style.css";

interface CardsProps {
  pokemonList: { name: string; url: string }[];
  getPokemonImage: (pokemon: { url: string }) => string;
}

const Cards: React.FC<CardsProps> = ({ pokemonList, getPokemonImage }) => {
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData();
        setPokemonData(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchDataAndSetState();
  }, []);

  return (
    <div className="cards-container flex flex-wrap">
      {pokemonList.map((pokemon) => {
        const imageUrl = getPokemonImage(pokemon);
        const pokemonDetails = pokemonData.find((p) => p.name === pokemon.name);

        return (
          <div
            key={pokemon.name}
            className="pokemon-card bg-white rounded p-4 m-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={`${pokemon.name} sprite`}
              className="w-64 sm:w-40 md:w-72 lg:w-80 xl:w-72 h-40 m-4 rounded-md"
            />
            <h3 className="text-center text-lg font-bold">{pokemon.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
