import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error retrieving favorites:", error);
    }
  };

  const toggleFavorite = async (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.movieCard}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Icon name="remove" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>The Favorites List is Empty</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

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

export default FavoritesScreen;
