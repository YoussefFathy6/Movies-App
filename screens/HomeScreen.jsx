// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import MovieCard from "../components/MovieCard";

export default function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("popular");
  const [items, setItems] = useState([
    { label: "Popular", value: "popular" },
    { label: "Top Movies", value: "top_movies" },
    { label: "Upcoming Movies", value: "upcoming_movies" },
    { label: "Now Playing Movies", value: "now_playing_movies" },
  ]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    fetchMovies(value);
  }, [value]);

  const fetchMovies = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  const filteredMovies = searchQuery
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : movies;

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={homeStyles.headerTitle}>Home</Text>
      </View>
      <View style={homeStyles.searchFilterContainer}>
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          style={homeStyles.searchInput}
          placeholderTextColor="#aaa"
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Filter"
          style={homeStyles.dropdown}
          dropDownContainerStyle={homeStyles.dropdownContainer}
          zIndex={1000}
          zIndexInverse={600}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredMovies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={homeStyles.movieList}
        />
      )}
    </View>
  );
}
// HomeScreenStyles.js

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#333",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 10,
  },
  searchFilterContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#333",
    zIndex: 1000,
  },
  searchInput: {
    width: "70%",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#444",
    color: "#fff",
  },
  dropdown: {
    marginLeft: 10,
    backgroundColor: "#444",
    borderWidth: 0,
  },
  dropdownContainer: {
    backgroundColor: "#444",
    borderWidth: 0,
  },
  movieList: {
    padding: 10,
  },
});
