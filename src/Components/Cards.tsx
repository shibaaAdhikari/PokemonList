// Cards.tsx
import React, { useEffect, useState } from "react";
import "../style.css";
import axios from "axios";
import { filterTerm, pokemonList, setPokemonList } from "../Store/pokemonStore";
import { useStore } from "@nanostores/react";
import type { TPokemon } from "../pages/index.astro";

interface CardsProps {}

const Cards: React.FC<CardsProps> = () => {
  const $pokemonList = useStore(pokemonList);
  const $filterTerm = useStore(filterTerm);

  useEffect(() => {
    const fetchData = async () => {
      const dataFROMLS = JSON.parse(
        localStorage.getItem("pokemonList") ?? "{}"
      ) as { items: TPokemon[]; fetchedTIme: number };
      console.log(!Object.entries(dataFROMLS).length, dataFROMLS);

      if (
        !Object.entries(dataFROMLS).length ||
        new Date().getMilliseconds() - dataFROMLS.fetchedTIme > 1000 * 60 * 60
      ) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const data = (await res.json()) as {
          results: TPokemon[];
        };
        const getPokemonImage = function (pokemon: TPokemon) {
          const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
          const urlSplitted = pokemon.url.split("/");
          const pokemonId = urlSplitted[urlSplitted.length - 2];
          return `${IMAGE_URL}${pokemonId}.png`;
        };
        const pokemonList = data.results.map((item) => ({
          ...item,
          image: getPokemonImage(item),
        }));
        localStorage.setItem(
          "pokemonList",
          JSON.stringify({
            items: pokemonList,
            fetchedTIme: new Date().getUTCMilliseconds(),
          })
        );
        setPokemonList(pokemonList);
      } else {
        setPokemonList(dataFROMLS.items);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cards-container flex flex-wrap justify-center items-center">
      {$pokemonList
        .filter((e) => e.name.includes($filterTerm) || $filterTerm == "")
        .map((pokemon) => {
          return (
            <div
              key={pokemon.name}
              className="pokemon-card bg-white rounded p-4 m-2 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={pokemon.image}
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
