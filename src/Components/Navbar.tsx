// Navbar.tsx
import React, { useState, type ChangeEventHandler } from "react";
import pokemonlogo from "../Asset/logo.png";
import { filterPokemonList } from "../Store/pokemonStore";

interface NavbarProps {
  src: string;
}

const Navbar: React.FC<NavbarProps> = ({ src }) => {
  return (
    <div className="flex justify-between bg-black p-5">
      <div>
        <img src={src} alt="logo" className="w-20" />
      </div>
      <div className="flex items-center order-2">
        <input
          type="search"
          placeholder="Search for Pokemon"
          className="p-2 pl-10 rounded-tl-md rounded-bl-md"
          onChange={(e) => filterPokemonList(e.target.value)}
        />
        <button className="bg-yellow-500 text-white p-2 rounded-tr-md rounded-br-md ">
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
