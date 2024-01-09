import React, { useEffect } from "react";
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
      const storedData = JSON.parse(
        localStorage.getItem("pokemonList") ?? "{}"
      ) as { items: TPokemon[]; fetchedTime: number };

      // Use the 'Date.now()' method to get the current time in milliseconds
      const currentTime = Date.now();

      // Check if data is not present or it's older than 1 hour
      if (
        !Object.entries(storedData).length ||
        currentTime - storedData.fetchedTime > 1000 * 60 * 60
      ) {
        try {
          // Use axios instead of fetch for consistency with the initial API call
          const res = await axios.get<{
            results: TPokemon[];
          }>("https://pokeapi.co/api/v2/pokemon");

          const getPokemonImage = (pokemon: TPokemon) => {
            const IMAGE_URL =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
            const urlSplitted = pokemon.url.split("/");
            const pokemonId = urlSplitted[urlSplitted.length - 2];
            return `${IMAGE_URL}${pokemonId}.png`;
          };

          const updatedPokemonList = res.data.results.map((item) => ({
            ...item,
            image: getPokemonImage(item),
          }));

          // Update the local storage with the new data
          localStorage.setItem(
            "pokemonList",
            JSON.stringify({
              items: updatedPokemonList,
              fetchedTime: currentTime,
            })
          );

          // Update the state with the new Pokemon list
          setPokemonList(updatedPokemonList);
        } catch (error) {
          console.error("Error fetching Pokemon data:", error);
        }
      } else {
        // Use the stored data if it's still valid
        setPokemonList(storedData.items);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Add an empty dependency array to run the effect only once on mount

  return (
    <div className="cards-container flex flex-wrap justify-center items-center">
      {$pokemonList
        .filter(
          (pokemon) => pokemon.name.includes($filterTerm) || $filterTerm === ""
        )
        .map((pokemon) => (
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
        ))}
    </div>
  );
};

export default Cards;
