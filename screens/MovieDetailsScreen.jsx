// MovieDetailsScreen.js
import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={movieDetailsStyles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={movieDetailsStyles.movieImage}
      />
      <Text style={movieDetailsStyles.title}>{movie.title}</Text>
      <Text style={movieDetailsStyles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
// MovieDetailsScreenStyles.js

const movieDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    padding: 20,
  },
  movieImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: "#ddd",
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailLabel: {
    color: "#aaa",
    fontSize: 16,
  },
  detailValue: {
    color: "#fff",
    fontSize: 16,
  },
});
