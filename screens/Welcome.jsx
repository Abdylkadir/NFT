import React, { useEffect, useRef } from "react"; // Импорт необходимых библиотек и хуков из React
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  SafeAreaView,
} from "react-native"; // Импорт компонентов из React Native
import { COLORS, FONTS, SIZES } from "../constants"; // Импорт констант для стилей
import nft08 from "../assets/images/nft08.jpg"; // Импорт изображений
import nft06 from "../assets/images/nft06.jpg";
import nft04 from "../assets/images/nft04.jpg";
import Button from "../components/Button"; // Импорт компонента Button
import { useNavigation } from "@react-navigation/native"; // Импорт хука для навигации

const Welcome = () => {
  const navigation = useNavigation(); // Инициализация навигации
  const duration = 1000; // Длительность анимации в миллисекундах
  const delay = duration + 300; // Задержка для анимации текста и кнопки

  // Инициализация анимационных значений с помощью хуков useRef
  const fadeImagesAnimation = useRef(new Animated.Value(0)).current; // Анимация прозрачности для изображений
  const moveImagesAnimation = useRef(
    new Animated.ValueXY({ x: 100, y: 100 })
  ).current; // Анимация перемещения для изображений
  const fadeTextAnimation = useRef(new Animated.Value(0)).current; // Анимация прозрачности для текста
  const moveButtonAnimation = useRef(new Animated.Value(1)).current; // Анимация перемещения для кнопки

  const pressHandler = () => {
    navigation.navigate("Home"); // Обработчик нажатия на кнопку, который навигирует на экран "Home"
  };

  // Обработчик анимации для изображений
  const imagesAnimationHandler = () => {
    Animated.sequence([
      Animated.timing(fadeImagesAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(moveImagesAnimation, {
        toValue: { x: 0, y: 0 },
        duration,
        useNativeDriver: true,
      }),
    ]).start(); // Запуск последовательной анимации: сначала плавное появление, затем перемещение
  };

  // Обработчик анимации для текста
  const textAnimationHandler = () => {
    Animated.timing(fadeTextAnimation, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start(); // Запуск анимации плавного появления текста с задержкой
  };

  // Обработчик анимации для кнопки
  const buttonAnimationHandler = () => {
    Animated.spring(moveButtonAnimation, {
      toValue: 0,
      friction: 4,
      delay,
      useNativeDriver: true,
    }).start(); // Запуск анимации перемещения кнопки с задержкой и трением
  };

  useEffect(() => {
    imagesAnimationHandler(); // Запуск анимации для изображений при монтировании компонента
    textAnimationHandler(); // Запуск анимации для текста при монтировании компонента
    buttonAnimationHandler(); // Запуск анимации для кнопки при монтировании компонента
  }, [imagesAnimationHandler, textAnimationHandler, buttonAnimationHandler]); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз при монтировании

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeImagesAnimation, // Привязка анимации прозрачности
            transform: moveImagesAnimation.getTranslateTransform(), // Привязка анимации перемещения
          },
        ]}
      >
        <View style={styles.imageCard}>
          <Image style={styles.image} source={nft06} />
        </View>
        <View style={[styles.imageCard, { top: SIZES.medium + 17 }]}>
          <Image style={styles.image} source={nft08} />
        </View>
        <View style={styles.imageCard}>
          <Image style={styles.image} source={nft04} />
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeTextAnimation, // Привязка анимации прозрачности для текста
          },
        ]}
      >
        <Text style={styles.mainText}>
          Найди, собирай и продавай удивительные НФТ
        </Text>
        <Text style={styles.subText}>
          Также исследуйте топовые коллекции НФТ, а еще покупайте и продавайте
          свои
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              {
                translateY: moveButtonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
              },
            ],
          },
        ]}
      >
        <Button
          title="Приступить"
          pressHandler={pressHandler}
          stylesButton={styles.button}
          stylesText={styles.textButton}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Welcome;

// Определение стилей для компонента
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.small + 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  imageContainer: {
    top: -SIZES.medium,
    flexDirection: "row",
    gap: SIZES.small,
  },
  imageCard: {
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.cardBg,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: SIZES.medium,
  },
  textContainer: {
    margin: SIZES.small,
    padding: SIZES.small,
    marginVertical: SIZES.xLarge + 6,
  },
  mainText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    textAlign: "center",
    color: COLORS.white,
  },
  subText: {
    fontFamily: FONTS.light,
    textAlign: "center",
    marginTop: SIZES.large,
    color: COLORS.gray,
  },
  buttonContainer: {
    position: "absolute",
    bottom: SIZES.xLarge + 10,
    marginVertical: SIZES.xLarge,
  },
  button: {
    backgroundColor: COLORS.second,
    padding: SIZES.small + 4,
    width: 240,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
});
