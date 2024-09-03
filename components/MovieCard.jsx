// src/components/MovieCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MovieCard({
  movie,
  isFavorite,
  onPress,
  onToggleFavorite,
}) {
  return (
    <TouchableOpacity style={styles.movieCard} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <View style={styles.descContainer}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onToggleFavorite}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={20}
            color={isFavorite ? "red" : "#fff"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

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
