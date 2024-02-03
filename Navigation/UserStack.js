import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Screen from "../Constants/Types";
import { Home, Product, Profile, Search } from "../screens";

const Stack = createNativeStackNavigator();

export default UserStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.home}>
      <Stack.Screen
        name={Screen.home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.search}
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.product}
        component={Product}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
