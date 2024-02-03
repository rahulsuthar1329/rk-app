import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import styles from "../../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import selectedRadio from "../../assets/selectedRadioOutlined.png";
import unSelectedRadio from "../../assets/unSelectedRadioOutlined.png";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox_Unselected from "../../assets/Checkbox_Unselected.png";
import Checkbox_selected from "../../assets/Checkbox_Selected.png";
import { useSelector } from "react-redux";

const InputField = ({
  type,
  placeholder,
  state,
  buttonText,
  setState,
  onPress,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  // For Date Only
  const [show, setShow] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setState(currentDate);
    setDateOfBirth(currentDate.toLocaleDateString());
  };

  if (type === "password")
    return (
      <View
        className="border border-[#349b7e] rounded-md px-4 py-2 flex flex-row items-center justify-between"
        // {...props}
      >
        <TextInput
          value={state}
          className="flex-[9]"
          placeholder={placeholder}
          secureTextEntry={!isVisible}
          onChangeText={(e) => setState(e)}
          style={styles.montserrat_medium}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          className="flex justify-center items-center flex-1"
          onPress={() => setIsVisible(!isVisible)}
        >
          <Ionicons
            name={isVisible ? "eye-off" : "eye"}
            size={22}
            color={"#5caf97"}
          />
        </TouchableOpacity>
      </View>
    );
  else if (type === "gender")
    return (
      <View className="border border-[#349b7e] rounded-md px-4 py-3 flex flex-row justify-between">
        <TouchableOpacity
          className="flex flex-row space-x-2 items-center"
          onPress={() => setState("male")}
          activeOpacity={0.5}
        >
          <Image
            source={state === "male" ? selectedRadio : unSelectedRadio}
            resizeMode="contain"
            style={styles.checkbox}
          />
          <Text style={styles.montserrat_medium} className="text-[#9b9a9a]">
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row space-x-2 items-center"
          onPress={() => setState("female")}
          activeOpacity={0.5}
        >
          <Image
            source={state === "female" ? selectedRadio : unSelectedRadio}
            resizeMode="contain"
            style={styles.checkbox}
          />
          <Text style={styles.montserrat_medium} className="text-[#9b9a9a]">
            Female
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row space-x-2 items-center"
          onPress={() => setState("other")}
          activeOpacity={0.5}
        >
          <Image
            source={state === "other" ? selectedRadio : unSelectedRadio}
            resizeMode="contain"
            style={styles.checkbox}
          />
          <Text style={styles.montserrat_medium} className="text-[#9b9a9a]">
            Other
          </Text>
        </TouchableOpacity>
      </View>
    );
  else if (type === "date")
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => setShow(true)}
        className="border border-[#349b7e] rounded-md px-4 py-3"
      >
        <Text style={styles.montserrat_medium} className="text-gray-400">
          {dateOfBirth ? dateOfBirth : "Date of Birth"}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={state}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
    );
  else if (type === "name")
    return (
      <View className="flex flex-row w-full justify-between">
        <TextInput
          placeholder="First Name"
          value={state.firstName}
          onChangeText={(e) => setState({ ...state, firstName: e })}
          className="border border-[#349b7e] rounded-md px-4 py-2 w-[48%]"
          style={styles.montserrat_medium}
        />
        <TextInput
          placeholder="Last Name"
          value={state.lastName}
          onChangeText={(e) => setState({ ...state, lastName: e })}
          className="border border-[#349b7e] rounded-md px-4 py-2 w-[48%]"
          style={styles.montserrat_medium}
        />
      </View>
    );
  else if (type === "checkbox")
    return (
      <TouchableOpacity
        onPress={() => setState(!state)}
        activeOpacity={0.5}
        className="flex flex-row items-center space-x-3 px-1 py-2"
      >
        <Image
          source={state ? Checkbox_selected : Checkbox_Unselected}
          resizeMode="contain"
          className="h-[15] w-[15]"
        />
        <View className="flex flex-row flex-1">
          <Text style={styles.montserrat_medium}>I agree with your </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.montserrat_medium} className="text-[#348b7e]">
              Terms and Conditions.
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  else if (type === "button")
    return (
      <TouchableOpacity
        className="flex justify-center items-center py-[10] bg-[#349b7e] rounded"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={loading ? true : false}
        style={styles.button_shadow}
        {...props}
      >
        <Text className="text-white" style={styles.montserrat_medium}>
          {loading ? "Loading..." : placeholder}
        </Text>
      </TouchableOpacity>
    );
  else if (type === "combination")
    return (
      <View className="border border-[#349b7e] rounded-md flex flex-row justify-between">
        <TextInput
          value={state}
          placeholder={placeholder}
          onChangeText={(e) => setState(e)}
          style={styles.montserrat_medium}
          className="px-4 py-2 flex-1"
        />
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-[#349b7e] rounded-r-sm flex justify-center items-center px-4"
          {...props}
        >
          <Text style={styles.montserrat_medium} className="text-white text-xs">
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  else if (type === "disabled")
    return (
      <View className="border border-[#349b7e] rounded-md px-4 py-3 flex flex-row justify-between items-center">
        <Text style={styles.montserrat_medium} className="text-gray-500">
          {state}
        </Text>
        <Ionicons name="lock-closed" size={18} color="#808080" />
      </View>
    );
  else
    return (
      <TextInput
        value={state}
        placeholder={placeholder}
        className="border border-[#349b7e] rounded-md px-4 py-2"
        style={styles.montserrat_medium}
        onChangeText={(e) => setState(e)}
        {...props}
      />
    );
};

export default InputField;
