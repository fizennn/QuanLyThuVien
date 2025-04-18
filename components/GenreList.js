import { FlatList, View, StyleSheet } from "react-native";
import React from "react";
import GenreItem from "./GenreItem"; // Import component GenreItem

const GenreList = ({ genres }) => {
  return (
    <View>
      <FlatList
        data={genres}
        keyExtractor={(item) => item._id} // Dùng _id làm key cho mỗi item
        renderItem={({ item }) => <GenreItem genre={item} />} // Render mỗi item bằng GenreItem
      />
    </View>
  );
};

export default GenreList;

const styles = StyleSheet.create({});
