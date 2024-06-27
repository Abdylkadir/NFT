import { StatusBar } from "expo-status-bar";
import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native"; // Импорт контейнера навигации
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Импорт функции для создания навигационного стека
import Welcome from "./screens/Welcome";
import Home from "./screens/Home";
import NFTDetails from "./screens/NFTDetails";
const App = () => {
  // Использование хука useFonts для загрузки шрифтов
  const [fontLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  // Если шрифты не загружены, возвращаем null (не рендерим ничего)
  if (!fontLoaded) return null;

  // Создание навигационного стека
  const Stack = createNativeStackNavigator();

  // Возвращаем JSX, который описывает структуру навигации
  return (
    <>
      {/* Настройка StatusBar */}
      <StatusBar style="light" animated={true} />
      {/* Контейнер навигации */}
      <NavigationContainer>
        {/* Навигационный стек */}
        <Stack.Navigator
          initialRouteName="Welcome" // Начальный экран - Welcome
          screenOptions={{
            headerShown: false, // Скрыть заголовок на всех экранах
          }}
        >
          {/* Определение экранов */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="NFT-details" component={NFTDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
