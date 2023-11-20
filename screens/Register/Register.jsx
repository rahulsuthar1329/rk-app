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
import Checkbox_Unselected from "../../assets/Checkbox_Unselected.png";
import Checkbox_selected from "../../assets/Checkbox_Selected.png";
import Google_Logo from "../../assets/Google_Logo.png";
import GenieCart_Logo from "../../assets/GenieCart_Teal.png";
import selectedRadio from "../../assets/selectedRadioOutlined.png";
import unSelectedRadio from "../../assets/unSelectedRadioOutlined.png";
import DateTimePicker from "@react-native-community/datetimepicker";
import path from "./../../path";
import {
  isEmailValid,
  isPasswordValid,
  isMobileValid,
  isUsernameValid,
} from "../../utils/validation";
import showToast from "./../../components/Toast/Toast";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditions, setConditions] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verifyOTPModel, setVerifyOTPModel] = useState(false);
  const [form, setForm] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  let formData = new FormData();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    console.log("Selected Date : ", selectedDate);
    setDate(currentDate);
    setDateOfBirth(currentDate.toLocaleDateString());
  };

  const handleOnSubmit = async () => {
    setLoading(true);
    try {
      if (
        firstName.trim().length >= 3 &&
        lastName.trim().length >= 3 &&
        isPasswordValid(password) &&
        password === confirmPassword &&
        isUsernameValid(username) &&
        isMobileValid(mobile) &&
        isEmailValid(email) &&
        dateOfBirth &&
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
          navigation.navigate("VerifyOTP");
          // setVerifyOTPModel(true);
          return;
        }
      } else {
        if (!firstName.trim()) showToast("Please enter first name.");
        else if (!lastName.trim()) showToast("Please enter last name.");
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
    <View className="flex-1 px-4 flex justify-center mt-12">
      <ScrollView
        // className="flex justify-center items-center py-5"
        // style={{ gap: 10 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
          gap: 10,
        }}
      >
        <Image
          source={GenieCart_Logo}
          resizeMode="contain"
          style={{ height: 35 }}
          className="py-2 mb-3"
        />
        <View className="flex w-[100%] px-2" style={{ gap: 15 }}>
          <View className="flex flex-row w-full justify-between">
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
              className="border border-[#349b7e] rounded-md px-4 py-2 w-[48%]"
              style={{ fontFamily: "Montserrat_Medium" }}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={(e) => setLastName(e)}
              className="border border-[#349b7e] rounded-md px-4 py-2 w-[48%]"
              style={{ fontFamily: "Montserrat_Medium" }}
            />
          </View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(e) => setUsername(e)}
            className="border border-[#349b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
          />
          <TextInput
            placeholder="Email Address"
            value={email}
            onChangeText={(e) => setEmail(e)}
            className="border border-[#349b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
          />
          <TextInput
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={(e) => setMobile(e)}
            className="border border-[#349b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setShow(true)}
            className="border border-[#349b7e] rounded-md px-4 py-3"
          >
            <Text
              style={{ fontFamily: "Montserrat_Medium" }}
              className="text-gray-400"
            >
              {dateOfBirth ? dateOfBirth : "Date of Birth"}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <View className="border border-[#349b7e] rounded-md px-4 py-3 flex flex-row justify-between">
            <TouchableOpacity
              className="flex flex-row space-x-2 items-center"
              onPress={() => setGender("male")}
              activeOpacity={0.5}
            >
              <Image
                source={gender === "male" ? selectedRadio : unSelectedRadio}
                resizeMode="contain"
                style={{ height: 15, width: "auto", aspectRatio: 1 }}
              />
              <Text
                style={{ fontFamily: "Montserrat_Medium" }}
                className="text-[#9b9a9a]"
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row space-x-2 items-center"
              onPress={() => setGender("female")}
              activeOpacity={0.5}
            >
              <Image
                source={gender === "female" ? selectedRadio : unSelectedRadio}
                resizeMode="contain"
                style={{ height: 15, width: "auto", aspectRatio: 1 }}
              />
              <Text
                style={{ fontFamily: "Montserrat_Medium" }}
                className="text-[#9b9a9a]"
              >
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row space-x-2 items-center"
              onPress={() => setGender("other")}
              activeOpacity={0.5}
            >
              <Image
                source={gender === "other" ? selectedRadio : unSelectedRadio}
                resizeMode="contain"
                style={{ height: 15, width: "auto", aspectRatio: 1 }}
              />
              <Text
                style={{ fontFamily: "Montserrat_Medium" }}
                className="text-[#9b9a9a]"
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(e) => setPassword(e)}
            className="border border-[#348b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(e) => setConfirmPassword(e)}
            className="border border-[#348b7e] rounded-md px-4 py-2"
            style={{ fontFamily: "Montserrat_Medium" }}
          />
        </View>
        <TouchableOpacity
          onPress={() => setConditions(!conditions)}
          activeOpacity={0.5}
          className="flex flex-row items-center w-[95%] space-x-3 px-1 py-2"
        >
          <Image
            source={conditions ? Checkbox_selected : Checkbox_Unselected}
            resizeMode="contain"
            style={{ height: 15, width: 15 }}
          />
          <View className="flex flex-row">
            <Text style={{ fontFamily: "Montserrat_Medium" }}>
              I agree with{" "}
            </Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text
                style={{ fontFamily: "Montserrat_Medium" }}
                className="text-[#348b7e]"
              >
                Terms and Conditions.
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex justify-center items-center bg-[#349b7e] rounded w-[95%]"
          activeOpacity={0.8}
          disabled={loading}
          style={{ elevation: 2, paddingVertical: 10 }}
        >
          {loading ? (
            <ActivityIndicator color={"white"} size={20} />
          ) : (
            <Text
              className="text-white"
              style={{ fontFamily: "Montserrat_Medium" }}
            >
              Register
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex flex-row pt-2">
          <Text style={{ fontFamily: "Montserrat_Medium" }}>
            Already have an Account ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              className="text-[#349b7e]"
              style={{ fontFamily: "Montserrat_Medium" }}
            >
              Login Now.
            </Text>
          </TouchableOpacity>
        </View>
        <View className="border-b w-[85%] border-gray-300 my-2"></View>
        <TouchableOpacity
          className="flex flex-row items-center justify-between space-x-2 w-[95%] bg-[#349b7e] py-2 pl-5 rounded"
          style={{ elevation: 2 }}
          activeOpacity={0.8}
        >
          <Image
            source={Google_Logo}
            resizeMode="contain"
            style={{ height: 25, width: "auto", aspectRatio: 1 }}
          />
          <Text
            className="text-white pr-7"
            style={{ fontFamily: "Montserrat_Medium" }}
          >
            Register with Google
          </Text>
          <View></View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
