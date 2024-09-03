// FavoritesScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieCard from "../components/MovieCard";

export default function FavoritesScreen() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavoriteMovies(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  const removeFavorite = async (movie) => {
    const updatedFavorites = favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    setFavoriteMovies(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <View style={favoritesStyles.container}>
      {favoriteMovies.length === 0 ? (
        <Text style={favoritesStyles.emptyText}>
          The Favorites List is Empty
        </Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={({ item }) => (
            <View style={favoritesStyles.movieCard}>
              <MovieCard movie={item} />
              <TouchableOpacity
                style={favoritesStyles.removeButton}
                onPress={() => removeFavorite(item)}
              >
                <Text style={favoritesStyles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
// FavoritesScreenStyles.js

const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 10,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  movieCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  movieTitle: {
    color: "#fff",
    fontSize: 20,
    flex: 1,
  },
  removeButton: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
