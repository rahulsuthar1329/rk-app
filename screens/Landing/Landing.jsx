import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import fonts from "../../fonts/font";
import * as Font from "expo-font";
import LandingImage from "../../assets/bag.png";
import Logo from "../../assets/GenieCart_Teal.png";
import React, { useEffect, useRef, useState } from "react";

const Landing = ({ navigation, route }) => {
  const win = Dimensions.get("window");
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [isTop, setIsTop] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  // const startAnimation = (toValue) => {
  //   Animated.timing(animatedValue, {
  //     toValue,
  //     duration: 1000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setIsTop(!isTop);
  //   });
  // };

  // useEffect(() => {
  //   startAnimation(isTop ? 1 : 0);
  // }, [isTop]);

  // const translateY = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [-15, 5],
  //   extrapolate: "clamp",
  // });

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fonts);
      setFontLoaded(true);
    };
    loadFonts();
  }, [fontLoaded]);

  return fontLoaded ? (
    <View className="flex-1 pt-12 bg-white flex gap-4">
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent
      />
      {/* Header */}
      <View className="flex flex-row justify-between items-center px-4 py-2">
        <View className="">
          <Image
            source={Logo}
            resizeMode="contain"
            style={{ width: win.width / 3, height: 30 }}
            // style={{ width: "auto", height: 50, aspectRatio: 2 }}
          />
        </View>
        <View className="flex flex-row justify-center gap-3">
          <TouchableOpacity
            style={styles.shadow}
            onPress={() => navigation.navigate("Login")}
            className="flex justify-center items-center bg-[#349b7e] w-[80] py-2 rounded-md"
          >
            <Text
              className="text-gray-100"
              style={{ fontFamily: "Montserrat_Medium", fontSize: 13 }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderWidth: 1 }}
            onPress={() => navigation.navigate("Register")}
            className="flex justify-center items-center border-[#349b7e] w-[80] py-2 rounded-md"
          >
            <Text
              className="text-[#349b7e]"
              style={{ fontFamily: "Montserrat_Medium", fontSize: 13 }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
      // style={{ transform: [{ translateY }] }}
      >
        <Image
          source={LandingImage}
          className=""
          resizeMode="contain"
          style={{
            width: win.width,
            height: "auto",
            aspectRatio: 1.5 / 1,
          }}
        />
      </Animated.View>

      {/* <View className="px-6 py-2">
        <View className="flex flex-row justify-between rounded-lg">
          <View className="w-[50] h-[50] rounded-lg border border-[#349b7e] flex justify-center items-center">
            <FontAwesome5 name="headphones-alt" size={24} color="#349b7e" />
          </View>
          <View className="w-[50] h-[50] rounded-lg border border-[#349b7e] flex justify-center items-center"></View>
          <View className="w-[50] h-[50] rounded-lg border border-[#349b7e] flex justify-center items-center"></View>
          <View className="w-[50] h-[50] rounded-lg border border-[#349b7e] flex justify-center items-center"></View>
          <View className="w-[50] h-[50] rounded-lg border border-[#349b7e] flex justify-center items-center"></View>
        </View>
      </View> */}

      {/* Content */}
      <View className="px-5 py-4 flex" style={{ gap: 20 }}>
        <View>
          <Text
            className="text-3xl"
            style={{ fontFamily: "Quicksand_SemiBold" }}
          >
            Unleash The
          </Text>
          <Text
            className="text-3xl text-[#349b7e]"
            style={{ fontFamily: "Quicksand_SemiBold" }}
          >
            Treasure of GenieCart!
          </Text>
        </View>
        <Text
          className="text-justify"
          style={{
            fontSize: 15,
            lineHeight: 25,
            fontFamily: "Quicksand_Medium",
          }}
        >
          Rub the lamp of GenieCart, and let your shopping wishes take flight!
          From trendy fashion finds to cutting-edge gadgets, We are here to
          grant you the ultimate shopping experience. So, go ahead and explore
          the magic of GenieCart - Your dreams, our command!
        </Text>
        <View className="flex flex-row py-3" style={{ gap: 15 }}>
          <TouchableOpacity
            style={styles.shadow}
            onPress={() => navigation.navigate("Login")}
            className="flex justify-center items-center bg-[#349b7e] w-[120] py-2 rounded-md"
          >
            <Text
              className="text-gray-100"
              style={{ fontFamily: "Montserrat_Medium" }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-center border-[#349b7e] w-[120] py-2 rounded-md"
            style={{ borderWidth: 1 }}
          >
            <Text
              className="text-[#349b7e]"
              style={{ fontFamily: "Montserrat_Medium" }}
            >
              Read More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <View>
      <ActivityIndicator size={18} color={"#349b7e"} />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
});
