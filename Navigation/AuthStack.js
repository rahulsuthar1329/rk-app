import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Screen from "../Constants/Types";
import {
  Login,
  Register,
  ForgotPassword,
  Landing,
  VerifyOTP,
} from "../screens";

const Stack = createNativeStackNavigator();

export default AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screen.landing}>
      <Stack.Screen
        name={Screen.login}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.landing}
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.register}
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.verification}
        component={VerifyOTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screen.forgot_password}
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
