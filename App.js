import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Info from "./components/Info";
import SetPlan from "./components/SetPlan"


const AppNavigator = createStackNavigator(
  {
    FALAFEL: {
      screen: Main,
      navigationOptions: { title: "FALAFEL" }
    },
    SignUp: {screen: Signup, navigationOptions:{title: 'Sign up'}},
    Login: {screen: Login, navigationOptions: {title: 'Log in'}},
    Info: {screen: Info, navigationOptions: {title: 'Required Info'} },
    SetPlan: {screen: SetPlan, navigationOptions: {title: 'Set a Plan'}}
  },
  { defaultNavigationOptions: { backgroundColor: "#000", headerTintColor: "#fff" } }
);

export default createAppContainer(AppNavigator);
