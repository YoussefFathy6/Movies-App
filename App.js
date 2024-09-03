// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavouritesScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ title: "Movie Details" }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import Icon from "react-native-vector-icons/FontAwesome";
// import DropDownPicker from "react-native-dropdown-picker";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Drawer = createDrawerNavigator();

// function HomeScreen({ navigation }) {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: "Popular", value: "popular" },
//     { label: "Top Movies", value: "top_movies" },
//     { label: "Upcoming Movies", value: "upcoming_movies" },
//     { label: "Now Playing Movies", value: "now_playing_movies" },
//   ]);

//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     fetchMovies();
//     getFavorites();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/movie/popular?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c"
//       );
//       setMovies(response.data.results);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setLoading(false);
//     }
//   };

//   const getFavorites = async () => {
//     try {
//       const storedFavorites = await AsyncStorage.getItem("favorites");
//       if (storedFavorites) {
//         setFavorites(JSON.parse(storedFavorites));
//       }
//     } catch (error) {
//       console.error("Error retrieving favorites:", error);
//     }
//   };

//   const toggleFavorite = async (movie) => {
//     let updatedFavorites = [];
//     if (favorites.some((fav) => fav.id === movie.id)) {
//       // Remove from favorites
//       updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
//     } else {
//       // Add to favorites
//       updatedFavorites = [...favorites, movie];
//     }

//     setFavorites(updatedFavorites);
//     await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   const renderMovieItem = ({ item }) => {
//     const isFavorite = favorites.some((fav) => fav.id === item.id);
//     return (
//       <View style={styles.movieCard}>
//         <Image
//           source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
//           style={styles.movieImage}
//         />
//         <View style={styles.descContainer}>
//           <Text style={styles.movieTitle}>{item.title}</Text>
//           <TouchableOpacity onPress={() => toggleFavorite(item)}>
//             <Icon
//               name={isFavorite ? "heart" : "heart-o"}
//               size={20}
//               color={isFavorite ? "red" : "#fff"}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Icon name="bars" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Home</Text>
//       </View>
//       <View style={styles.searchFilterContainer}>
//         <TextInput
//           placeholder="Search"
//           style={styles.searchInput}
//           placeholderTextColor="#aaa"
//         />
//         <DropDownPicker
//           open={open}
//           value={value}
//           items={items}
//           setOpen={setOpen}
//           setValue={setValue}
//           setItems={setItems}
//           placeholder="Filter"
//           style={styles.dropdown}
//           dropDownContainerStyle={styles.dropdownContainer}
//           zIndex={1000}
//           zIndexInverse={600}
//         />
//       </View>
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#fff"
//           style={{ marginTop: 20 }}
//         />
//       ) : (
//         <FlatList
//           data={movies}
//           renderItem={renderMovieItem}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.movieList}
//         />
//       )}
//     </View>
//   );
// }

// function FavoritesScreen() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     getFavorites();
//   }, []);

//   const getFavorites = async () => {
//     try {
//       const storedFavorites = await AsyncStorage.getItem("favorites");
//       if (storedFavorites) {
//         setFavorites(JSON.parse(storedFavorites));
//       }
//     } catch (error) {
//       console.error("Error retrieving favorites:", error);
//     }
//   };

//   const toggleFavorite = async (movie) => {
//     const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
//     setFavorites(updatedFavorites);
//     await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   const renderFavoriteItem = ({ item }) => (
//     <View style={styles.movieCard}>
//       <Text style={styles.movieTitle}>{item.title}</Text>
//       <TouchableOpacity onPress={() => toggleFavorite(item)}>
//         <Icon name="remove" size={20} color="red" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {favorites.length === 0 ? (
//         <Text style={styles.emptyText}>The Favorites List is Empty</Text>
//       ) : (
//         <FlatList
//           data={favorites}
//           renderItem={renderFavoriteItem}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )}
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Favorites" component={FavoritesScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1e1e1e",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#333",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 20,
//     marginLeft: 10,
//   },
//   searchFilterContainer: {
//     flexDirection: "row",
//     padding: 10,
//     alignItems: "center",
//     backgroundColor: "#333",
//     zIndex: 1000,
//   },
//   searchInput: {
//     width: "70%",
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: "#444",
//     color: "#fff",
//   },
//   dropdown: {
//     marginLeft: 10,
//     backgroundColor: "#444",
//     borderWidth: 0,
//     zIndex: 1000,
//   },
//   dropdownContainer: {
//     backgroundColor: "#444",
//     borderWidth: 0,
//     zIndex: 1000,
//   },
//   movieList: {
//     padding: 10,
//   },
//   movieCard: {
//     backgroundColor: "#333",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginBottom: 10,
//     padding: 10,
//     flexDirection: "column",
//     alignItems: "center",
//     elevation: 1,
//   },
//   descContainer: {
//     flexDirection: "row",
//     padding: 10,
//   },
//   movieImage: {
//     width: "100%",
//     height: 250,
//     borderRadius: 8,
//   },
//   movieTitle: {
//     color: "#fff",
//     fontSize: 24,
//     flex: 1,
//     marginLeft: 10,
//   },
//   favoriteButton: {
//     padding: 8,
//   },
//   emptyText: {
//     color: "#fff",
//     fontSize: 18,
//     textAlign: "center",
//     marginTop: 20,
//   },
// });
