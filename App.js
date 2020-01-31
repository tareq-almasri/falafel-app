import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Info from "./components/Info";
import SetPlan from "./components/SetPlan"


const AppNavigator = createStackNavigator({
  FALAFEL: Main,
  SignUp: Signup,
  Login: Login,
  Info: Info,
  SetPlan: SetPlan
});

export default createAppContainer(AppNavigator);
