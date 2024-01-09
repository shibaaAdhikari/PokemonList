import React from "react";

interface Pokemon {
  name: string;
  // You can add more properties if needed
}

interface CardsProps {
  pokemonList: Pokemon[];
}

const Cards: React.FC<CardsProps> = ({ pokemonList }) => {
  return (
    <div className="flex flex-wrap justify-evenly">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.name}
          className="w-full sm:w-48 md:w-64 lg:w-72 xl:w-64 h-80 bg-black shadow-md text-center rounded-md transition duration-300 ease-in-out transform hover:scale-105 m-2"
        >
          <p className="text-red-300">{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
