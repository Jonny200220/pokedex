import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {

  interface Pokemon {
    name: string;
    image: string;
    imageBack: string
    types: pokemonType[];
  }

  interface pokemonType {
    type: {
      name: string;
      url: string;
    };
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
            imageBack: details.sprites.back_default,
            types: details.types,
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
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: pokemon.image }} style={{ width: 150, height: 150 }} />
              <Image source={{ uri: pokemon.imageBack }} style={{ width: 150, height: 150 }} />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
