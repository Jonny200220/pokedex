import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

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

const colorsByType = {
  grass: "#A8D5BA",
  fire: "#FFB3A7",
  water: "#A7C7E7",
  electric: "#FFF4A3",
  ice: "#B8E6E6",
  fighting: "#E6A5A5",
  poison: "#D4A5D4",
  ground: "#E8D4A8",
  flying: "#C9B8E6",
  psychic: "#FFB8D1",
  bug: "#D4E6A5",
  rock: "#D9C9A8",
  ghost: "#B8A5C9",
  dragon: "#B8A5E6",
  dark: "#B8A599",
  steel: "#D4D4E6",
  fairy: "#FFD4E5",
  normal: "#D9D9D9",
}

export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
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
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      {pokemons.map((pokemon) => {
        return (
          // @ts-ignore - typescript no puede inferir el tipo de colorsByType
          <View key={pokemon.name} style={{ padding: 10, backgroundColor: colorsByType[pokemon.types[0].type.name] }}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
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

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    textTransform: 'capitalize',
  },
});
