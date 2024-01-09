import { atom } from "nanostores";
import type { TPokemon } from "../pages/index.astro";

export const pokemonList = atom<TPokemon[]>([]);
export const filterTerm = atom<string>("");
export const setPokemonList = (pokemon: TPokemon[]) => {
  pokemonList.set(pokemon);
};

export const filterPokemonList = (name: string) => {
  filterTerm.set(name);
};
