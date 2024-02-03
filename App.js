import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeWindStyleSheet } from "nativewind";

import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import MainStack from "./Navigation/MainStack";
import * as Screen from "./Constants/Types";
import * as Linking from "expo-linking";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const prefix = Linking.createURL("/");

export default function App() {
  console.log({ prefix });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          linking={{
            prefixes: [prefix, "https://www.rkenterprisy.com"],
            config: {
              screens: {
                [Screen.register]: "register",
              },
            },
          }}
        >
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
