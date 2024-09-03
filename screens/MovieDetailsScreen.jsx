// src/screens/MovieDetailsScreen.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function MovieDetailsScreen({ route }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      {/* Add more details here as needed */}
    </View>
  );
}

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
