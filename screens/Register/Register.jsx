import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  isEmailValid,
  isPasswordValid,
  isMobileValid,
  isUsernameValid,
} from "../../utils/validation";
import path from "./../../path";
import styles from "../../styles/styles";
import * as Screen from "../../Constants/Types";
import showToast from "./../../components/Toast/Toast";
import Google_Logo from "../../assets/Google_Logo.png";
import GenieCart_Logo from "../../assets/GenieCart_Teal.png";
import InputField from "./../../components/InputField/InputField";
import { sendOTP } from "../../store/extraReducers/AuthReducers";

const Register = ({ navigation }) => {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditions, setConditions] = useState(false);
  const [form, setForm] = useState(null);
  const [date, setDate] = useState(new Date());
  let formData = new FormData();
  const dispatch = useDispatch();

  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      if (
        name.firstName.trim().length >= 3 &&
        name.lastName.trim().length >= 3 &&
        isPasswordValid(password) &&
        password === confirmPassword &&
        isUsernameValid(username) &&
        isMobileValid(mobile) &&
        isEmailValid(email) &&
        date &&
        gender &&
        conditions
      ) {
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("username", username);
        formData.append("mobile", mobile);
        formData.append("gender", gender);
        formData.append("email", email.toLowerCase());
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("password", password);

        setForm(formData);

        const response = await axios.post(`${path}/auth/send_auth_otp`, {
          email: email.trim().toLowerCase(),
          username: username.trim(),
        });
        if (response.data) {
          setLoading(false);
          showToast("OTP has been sent to your mail successfully.");
          navigation.navigate(Screen.verification);
          return;
        }
      } else {
        if (!name.firstName.trim()) showToast("Please enter first name.");
        else if (!name.lastName.trim()) showToast("Please enter last name.");
        else if (!username.trim()) showToast("Please enter username.");
        else if (!isUsernameValid(username))
          showToast("Please enter valid username.");
        else if (!email.trim()) showToast("Please enter email.");
        else if (!isEmailValid(email)) showToast("Please enter valid email.");
        else if (!mobile.trim()) showToast("Please enter mobile number.");
        else if (!isMobileValid(mobile))
          showToast("Please enter valid mobile number.");
        else if (!dateOfBirth.trim())
          showToast("Please select your Date of Birth.");
        else if (!gender.trim()) showToast("Please select your gender.");
        else if (!password.trim()) showToast("Please enter a password.");
        else if (!isPasswordValid(password))
          showToast("Please enter a valid password.");
        else if (password !== confirmPassword)
          showToast("Password and Confirm Password doesn't match.");
        else if (!conditions)
          showToast("Please agree to our terms and conditions.");
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        showToast(error.response.data.message);
        setLoading(false);
        return;
      }
      showToast("Internal Server Error!");
      console.log("Register Error : ", error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 px-4 flex mt-12">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_container}
      >
        <Image
          source={GenieCart_Logo}
          resizeMode="contain"
          className="py-2 mb-3 h-[32]"
        />
        <View className="flex w-[100%] px-2 " style={styles.input_gap}>
          <InputField type="name" state={name} setState={setName} />
          <InputField
            placeholder="Username"
            state={username}
            setState={setUsername}
          />
          <InputField
            placeholder="Email Address"
            state={email}
            setState={setEmail}
          />
          <InputField
            placeholder="Mobile Number"
            state={mobile}
            setState={setMobile}
          />
          <InputField type="date" state={date} setState={setDate} />
          <InputField type="gender" state={gender} setState={setGender} />
          <InputField
            type="password"
            placeholder={"Password"}
            state={password}
            setState={setPassword}
          />
          <InputField
            placeholder={"Confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>
        <View className="w-full px-2">
          <InputField
            type="checkbox"
            state={conditions}
            setState={setConditions}
          />
        </View>
        <View className="px-2 w-full">
          <InputField
            type="button"
            placeholder="Register"
            className="w-full"
            onPress={() => dispatch(sendOTP(email))}
          />
        </View>

        <View className="flex flex-row pt-2">
          <Text style={styles.montserrat_medium}>
            Already have an Account ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(Screen.login)}>
            <Text className="text-[#349b7e]" style={styles.montserrat_medium}>
              Login Now.
            </Text>
          </TouchableOpacity>
        </View>
        <View className="border-b w-[85%] border-gray-300 my-2"></View>
        <TouchableOpacity
          className="flex flex-row items-center justify-between space-x-2 w-[95%] bg-[#349b7e] py-2 pl-5 rounded"
          style={styles.button_shadow}
          activeOpacity={0.8}
        >
          <Image
            source={Google_Logo}
            resizeMode="contain"
            style={{ height: 25, width: "auto", aspectRatio: 1 }}
          />
          <Text className="text-white pr-7" style={styles.montserrat_medium}>
            Register with Google
          </Text>
          <View></View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;
