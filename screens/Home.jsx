import React, { useEffect, useRef, useState } from "react"; // Импорт необходимых хуков и библиотеки React
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Animated,
} from "react-native"; // Импорт необходимых компонентов из React Native
import { COLORS, DATA, FONTS, SIZES } from "../constants"; // Импорт констант для стилей и данных
import NFTCard from "../components/NFTCard"; // Импорт компонента NFTCard
import HomeHeader from "../components/HomeHeader"; // Импорт компонента HomeHeader
import { StatusBar } from "react-native"; // Импорт компонента StatusBar
import { FlashList } from "@shopify/flash-list"; // Импорт компонента FlashList из библиотеки @shopify/flash-list

const Home = () => {
  const [nftsData, setNftsData] = useState(DATA); // Инициализация состояния для данных НФТ
  const moveSearchAnimation = useRef(new Animated.Value(0)).current; // Инициализация анимационного значения для поиска

  // Обработчик поиска НФТ
  const searchHandler = (value) => {
    if (value) {
      const filteredData = DATA.filter((nft) =>
        nft.name.toLowerCase().includes(value.toLowerCase())
      );
      setNftsData(filteredData); // Установка отфильтрованных данных НФТ
    } else {
      setNftsData(DATA); // Возврат к исходным данным, если поле поиска пустое
    }
  };

  // Компонент, отображаемый, если НФТ не найдены
  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Упс...</Text>
        <Text style={styles.notFoundText}>Не нашли такое НФТ</Text>
      </View>
    );
  };

  // Обработчик анимации для строки поиска
  const searchAnimationHandler = () => {
    Animated.spring(moveSearchAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start(); // Запуск анимации пружины для строки поиска
  };

  useEffect(() => {
    searchAnimationHandler(); // Запуск анимации при монтировании компонента
  }, [searchAnimationHandler]); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз при монтировании

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              top: -100,
              transform: [
                {
                  translateY: moveSearchAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ],
            }}
          >
            <HomeHeader searchHandler={searchHandler} />{" "}
            {/* Компонент заголовка с функцией поиска */}
          </Animated.View>
          {!nftsData.length ? (
            <NotFoundNFT /> // Отображение сообщения, если НФТ не найдены
          ) : (
            <FlashList
              data={nftsData} // Данные для списка
              renderItem={({ item }) => <NFTCard NFTData={item} />} // Рендеринг каждого элемента списка с использованием компонента NFTCard
              keyExtractor={(item) => item.id} // Установка ключа для каждого элемента списка
              estimatedItemSize={200} // Примерный размер каждого элемента списка
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Home;

// Определение стилей для компонентов
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: StatusBar.currentHeight + 10,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xLarge,
  },
  notFoundText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
  },
});
