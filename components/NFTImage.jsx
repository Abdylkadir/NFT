// Импорт необходимых компонентов и библиотек из React Native и React
import { View, StyleSheet, Image, StatusBar } from "react-native";
import React from "react";
import Button from "./Button"; // Импорт пользовательского компонента Button
import { AntDesign } from "@expo/vector-icons"; // Импорт иконок из библиотеки @expo/vector-icons
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants"; // Импорт констант цветов

const NFTImage = ({ image, imageStyles, love, arrow, pressHandler }) => {
  return (
    <View style={styles.container}>
      {/* Отображение изображения с заданными стилями */}
      <Image source={image} style={imageStyles} resizeMode="cover" />
      {/* Если параметр love передан, отображаем кнопку с иконкой сердца */}
      {love && (
        <Button
          stylesButton={styles.buttonHeart}
          Icon={<AntDesign name="heart" size={20} color={COLORS.second} />}
        />
      )}
      {/* Если параметр arrow передан, отображаем кнопку с иконкой стрелки */}
      {arrow && (
        <Button
          stylesButton={styles.buttonArrow}
          Icon={<Feather name="arrow-left" size={20} color={COLORS.second} />}
          pressHandler={pressHandler && pressHandler} // Привязка обработчика нажатия, если он передан
        />
      )}
    </View>
  );
};

// Стили для компонента
const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  buttonHeart: {
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    right: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 40,
  },
  buttonArrow: {
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    left: 10,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 40,
  },
});

export default NFTImage;
