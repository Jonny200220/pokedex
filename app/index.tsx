import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Index() {

  interface Pokemon {
    name: string;
    url: string;
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
      setPokemons(data.results);
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
          </View>
        );
      })}
    </ScrollView>
  );
}
