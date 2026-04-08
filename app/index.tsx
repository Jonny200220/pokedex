import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";

export default function Index() {

  interface Pokemon {
    name: string;
    image: string;
    
  }

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          return {
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );
      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      {pokemons.map((pokemon) => {
        return (
          <View key={pokemon.name}>
            <Text>{pokemon.name}</Text>
            <Image source={{ uri: pokemon.image }} style={{ width: 100, height: 100 }} />
          </View>
        );
      })}
    </ScrollView>
  );
}
