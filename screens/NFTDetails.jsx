import { View, SafeAreaView, StyleSheet, Text, Animated } from "react-native"; // Импорт необходимых компонентов из React Native
import { COLORS, SIZES, FONTS } from "../constants"; // Импорт констант для стилей
import React, { useEffect, useRef } from "react"; // Импорт хуков
import NFTImage from "../components/NFTImage";
import NFTAvatars from "../components/NFTAvatars";
import NFTTitle from "../components/NFTTitle";
import NFTInfo from "../components/NFTInfo";
import NFTMoreinfo from "../components/NFTMoreInfo";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/Button";

const NFTDetails = ({ route, navigation }) => {
  const { NFTData } = route.params; // Получение данных о НФТ из параметров маршрута
  const moveAnimation = useRef(new Animated.Value(0)).current; // Инициализация анимационного значения для перемещения
  const fadeAnimation = useRef(new Animated.Value(0)).current; // Инициализация анимационного значения для прозрачности

  // Обработчик нажатия кнопки, возвращающий на предыдущий экран
  const pressHandler = () => {
    navigation.goBack();
  };

  // Обработчик анимации перемещения
  const moveAnimationHandler = () => {
    Animated.spring(moveAnimation, {
      toValue: 1,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start(); // Запуск анимации пружины для перемещения
  };

  // Обработчик анимации прозрачности
  const fadeAnimationHandler = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      delay: 300,
      useNativeDriver: true,
    }).start(); // Запуск анимации плавного появления с задержкой
  };

  // Запуск анимаций при монтировании компонента
  useEffect(() => {
    moveAnimationHandler();
    fadeAnimationHandler();
  }, [moveAnimationHandler, fadeAnimationHandler]); // Пустой массив зависимостей означает, что этот эффект выполнится только один раз при монтировании

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              translateY: moveAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
              }),
            },
          ],
        }}
      >
        <NFTImage
          image={NFTData.image}
          imageStyles={styles.imageStyles}
          love
          arrow
          pressHandler={pressHandler} // Привязка обработчика нажатия к изображению
        />
        <View style={{ paddingHorizontal: SIZES.xLarge }}>
          <View style={{ marginTop: -SIZES.xLarge }}>
            <NFTAvatars avatars={NFTData.avatars} />{" "}
            {/* Отображение аватаров */}
          </View>
          <View style={{ marginVertical: SIZES.medium }}>
            <NFTTitle
              _name={NFTData.name}
              creator={NFTData.creator}
              date={NFTData.date} // Отображение названия, создателя и даты НФТ
            />
          </View>
          <View style={{ marginVertical: SIZES.medium }}>
            <NFTInfo
              price={NFTData.price}
              views={NFTData.views}
              comments={NFTData.comments} // Отображение цены, просмотров и комментариев
            />
          </View>
          <View style={{ marginVertical: SIZES.medium }}>
            <NFTMoreinfo
              address={NFTData.address}
              tokenId={NFTData.tokenId}
              tokenSt={NFTData.tokenSt}
              blockchain={NFTData.blockchain} // Отображение дополнительной информации о НФТ
            />
          </View>
        </View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnimation, // Привязка анимации прозрачности к кнопке
            },
          ]}
        >
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.text}>Цена ставки</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  padding: SIZES.small - 4,
                }}
              >
                <FontAwesome name="dollar" size={15} color="white" />
                <Text style={styles.text}>{NFTData.topBid}</Text>{" "}
                {/* Отображение цены топовой ставки */}
              </View>
            </View>
            <Button
              title="Оформить"
              stylesButton={styles.button}
              stylesText={styles.textButton} // Привязка стилей и текста к кнопке
            />
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default NFTDetails;

// Определение стилей для компонентов
const styles = StyleSheet.create({
  // Стиль для основного контейнера
  container: {
    flex: 1, // Устанавливает компоненту гибкость для заполнения всего доступного пространства
    backgroundColor: COLORS.bg, // Устанавливает фоновый цвет из констант
  },
  // Стиль для изображения
  imageStyles: {
    width: "100%", // Устанавливает ширину изображения на 100% ширины контейнера
    height: 400, // Устанавливает фиксированную высоту изображения
    borderRadius: 20, // Закругляет углы изображения
  },
  // Стиль для текста
  text: {
    fontSize: SIZES.medium, // Устанавливает размер текста из констант
    fontFamily: FONTS.semiBold, // Устанавливает шрифт текста из констант
    color: COLORS.white, // Устанавливает цвет текста из констант
  },
  // Стиль для контейнера кнопки
  buttonContainer: {
    width: "100%", // Устанавливает ширину контейнера на 100%
    position: "absolute", // Устанавливает абсолютное позиционирование
    bottom: SIZES.small, // Устанавливает отступ снизу из констант
    justifyContent: "center", // Центрирует содержимое по горизонтали
    alignItems: "center", // Центрирует содержимое по вертикали
    zIndex: 1, // Устанавливает приоритет по оси Z
  },
  // Стиль для обертки
  wrapper: {
    backgroundColor: COLORS.cardBg, // Устанавливает фоновый цвет из констант
    width: 300, // Устанавливает фиксированную ширину
    flexDirection: "row", // Устанавливает направление оси для детей компонента
    justifyContent: "space-between", // Распределяет детей компонента с пространством между ними
    alignItems: "center", // Выравнивает детей компонента по вертикали по центру
    padding: 20, // Устанавливает внутренние отступы
    borderRadius: 20, // Закругляет углы
  },
  // Стиль для кнопки
  button: {
    backgroundColor: COLORS.second, // Устанавливает фоновый цвет кнопки из констант
    padding: 16, // Устанавливает внутренние отступы кнопки
    width: 150, // Устанавливает фиксированную ширину кнопки
    borderRadius: 20, // Закругляет углы кнопки
  },
  // Стиль для текста кнопки
  textButton: {
    color: COLORS.white, // Устанавливает цвет текста из констант
    textAlign: "center", // Центрирует текст по горизонтали
    fontFamily: FONTS.semiBold, // Устанавливает шрифт текста из констант
    fontSize: 16, // Устанавливает фиксированный размер текста
  },
});
