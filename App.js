import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Info from "./components/Info";
import SetPlan from "./components/SetPlan";
import AddFood from "./components/AddFood";


const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { title: "Log in" } },
    SignUp: { screen: Signup, navigationOptions: { title: "Sign up" } },
    Info: { screen: Info, navigationOptions: { title: "Info" } },
    SetPlan: { screen: SetPlan, navigationOptions: { title: "Set a Plan" } },
    FALAFEL: {
      screen: Main,
      navigationOptions: { title: "FALAFEL" }
    },
    AddFood: {screen: AddFood, navigationOptions: {title: 'Add Food'}}
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#000", height: 80 },
      headerTintColor: "#fff"
    }
  }
);

export default createAppContainer(AppNavigator);
