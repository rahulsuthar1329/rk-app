import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/AuthSlice";
const Home = () => {
  const dispatch = useDispatch();
  return (
    <View className="flex-1 flex items-center justify-center">
      <Text>Welcome, rkchouhan1329 !</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="px-4 py-2 bg-gray-400 rounded-sm mt-5"
        onPress={() => dispatch(logout())}
      >
        <Text className="text-gray-200">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
