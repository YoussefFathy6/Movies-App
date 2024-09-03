// MovieCard.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    let storedFavorites = await AsyncStorage.getItem("favorites");
    storedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    if (!isFavorite) {
      storedFavorites.push(movie);
    } else {
      storedFavorites = storedFavorites.filter(
        (favMovie) => favMovie.id !== movie.id
      );
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(storedFavorites));
  };

  return (
    <TouchableOpacity
      style={movieCardStyles.movieCard}
      onPress={() => navigation.navigate("MovieDetails", { movie })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={movieCardStyles.movieImage}
      />
      <View style={movieCardStyles.descContainer}>
        <Text style={movieCardStyles.movieTitle}>{movie.title}</Text>
        <TouchableOpacity
          style={movieCardStyles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color="#f00"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
// MovieCardStyles.js

const movieCardStyles = StyleSheet.create({
  movieCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    elevation: 1,
  },
  movieImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  descContainer: {
    flexDirection: "row",
    padding: 10,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 24,
    flex: 1,
    marginLeft: 10,
  },
  favoriteButton: {
    padding: 8,
  },
});
