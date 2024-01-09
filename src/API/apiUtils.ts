// API/apiUtils.ts
export interface PokemonDetails {
  name: string;
  type: string;
  imageUrl: string;
}

const fetchData = async (): Promise<PokemonDetails[]> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json();

    // Enhance the data by adding name, type, and image URL
    const enhancedData = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();

        const imageUrl =
          pokemonDetails.sprites.versions["generation-ii"].crystal.front_default;

        return {
          name: pokemon.name,
          type: pokemonDetails.types[0].type.name,
          imageUrl,
        };
      })
    );

    return enhancedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchData };


export async function createCollection() {
  const colors = [];
  for (const index of Array(10).keys()) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${index + 1}`)
    const result = await response.json()
    colors.push(result)
  }

  return {
    route: '/colors/:color',
    paths() {
      return colors.map(color => ({params: {color: color.name}}))
    },
    async props({ params}) {
      return {
        color: colors.find(color => color.name === params.color),
      }
    }
  }
}

const { color } = Astro.props
const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`

const getPokemonImage = function (pokemon) {
  const urlSplitted = pokemon.url.split('/')
  const pokemonId = urlSplitted[urlSplitted.length - 2]

  return `${IMAGE_URL}${pokemonId}.png`
}
