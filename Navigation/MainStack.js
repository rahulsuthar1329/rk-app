import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { useSelector } from "react-redux";

export default MainStack = () => {
  const { user } = useSelector((state) => state.auth);
  return user?._id ? <UserStack /> : <AuthStack />;
};
