import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { ACCESS_SERVER_URL } from "react-native-dotenv";
import Speedometer from "react-native-speedometer-chart";
import * as Progress from "react-native-progress";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TdeeHelp from "./TdeeHelp";
import AddFood from "./AddFood";

class Main extends Component {
  state = {
    _id: "",
    username: "",
    password: "",
    tdee: 0,
    goalCal: 0,
    diet: "",
    proteinDL: 0,
    carbsDL: 0,
    fatDL: 0,
    sugarDL:0,
    caffDL:0,
    dailyPlan: {
      wakeUp: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      sleep: ""
    },
    sport: [["", "", ""]],
    udi: {
      date: "",
      calCount: 0,
      proteinCount: 0,
      fatCount: 0,
      carbsCount: 0,
      waterCount: 0,
      caffCount: 0,
      sugarCount: 0,
    },
    visible: false,
    addFoodVisible: false
  };

  askPermission = async () => {
    await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
  };
  reminder = async () => {
    await this.askPermission();
    let time = Date().substring(16, 21);
    if (Object.values(this.state.dailyPlan).indexOf(time) == 0) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Wake Up Time",
        body: "rise and shine! time to start a new and healthy day :)",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 1) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Breakfast Time",
        body: "it's time for a healthy breakfast!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 2) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Lunch Time",
        body: "it's time for a healthy lunch!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 3) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Dinner Time",
        body: "it's time for a healthy dinner!",
        ios: { sound: true }
      });
    } else if (Object.values(this.state.dailyPlan).indexOf(time) == 4) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Sleep Time",
        body: "it's time to get some rest, see you in the morning!",
        ios: { sound: true }
      });
    } else if (this.state.sport.some(x => x[1] == time)) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Workout Time",
        body: "it's your workout time! have fun and make the best out of it",
        ios: { sound: true }
      });
    } else if (this.state.sport.some(x => x[2] == time)) {
      Notifications.presentLocalNotificationAsync({
        title: "Reminder: Workout Time's Up",
        body: "you've finished your scheduled workout, Great Job!",
        ios: { sound: true }
      });
    }
  };

  // handleAddFood = () => {};

  resetUdi = () => {
    let date = Date().substring(0, 15);
    fetch(
      `http://${ACCESS_SERVER_URL}/api/reset/?username=${this.props.navigation.getParam(
        "token"
      )}&date=${date}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
    this.setState({
      udi: {
        date: date,
        calCount: 0,
        proteinCount: 0,
        fatCount: 0,
        carbsCount: 0,
        waterCount: 0,
        caffCount: 0,
        sugarCount: 0
      },
    });
  };

  UNSAFE_componentWillMount() {
    fetch(
      `http://${ACCESS_SERVER_URL}/api/home/?username=${this.props.navigation.getParam(
        "token"
      )}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(data.found);
      });
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.udi.date !== Date().substring(0, 15)) {
        this.resetUdi();
      }

      this.reminder();
    }, 10000);
  }

  handleOk = () => {
    this.setState({ visible: false });
  };

  handleLogout = () => {
    AsyncStorage.removeItem("userData");
    this.props.navigation.replace("Login");
  };

  render() {
    let arr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let date = Date().substring(0, 3);
    let arr2 = arr
      .slice(arr.indexOf(Date().substring(0, 3)))
      .concat(arr.slice(0, arr.indexOf(Date().substring(0, 3))));
    console.log(arr2);
    return (
      <ScrollView>
        <View style={style.container}>
          <AddFood visible={this.state.addFoodVisible} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <Text style={{ color: "#fff" }}>
              Hello {this.props.navigation.getParam("token")}!
            </Text>
            <Button
              style={{ width: 50 }}
              title="Log out"
              onPress={this.handleLogout}
            />
          </View>
          <TdeeHelp visible={this.state.visible} ok={this.handleOk} />
          <View style={style.remainingCaloriesContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#fff" }}>
                Your TDEE: {this.state.tdee}
              </Text>
              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => this.setState({ visible: true })}
              >
                <FontAwesome5
                  name={"question-circle"}
                  color="#2772ea"
                  size={18}
                />
              </TouchableOpacity>
            </View>

            <Text style={{ color: "#fff", marginTop: 10, marginBottom: 20 }}>
              Your Goal-Calories: {this.state.goalCal}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%"
              }}
            >
              <View style={{ position: "relative", marginRight: 40 }}>
                <Image
                  style={{ width: 20, height: 60 }}
                  source={require("../assets/water.png")}
                />
                <Image
                  style={{ width: 20, height: 60 }}
                  source={require("../assets/water.png")}
                />
                <View
                  style={{
                    transform: [{ rotate: "-90deg" }],
                    position: "absolute",
                    left: -49,
                    top: 47,
                    zIndex: -1
                  }}
                >
                  <Progress.Bar
                    height={20}
                    progress={this.state.udi.waterCount}
                    width={118}
                    borderColor="black"
                    unfilledColor="#5b5b5b"
                  />
                </View>
              </View>

              <Speedometer
                value={2195}
                totalValue={this.state.goalCal}
                size={200}
                showText
                textStyle={{
                  color: "white",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 3,
                  width: 50,
                  textAlign: "center"
                }}
                showLabels
                labelStyle={{ color: "#fff" }}
                text={"" + this.state.udi.calCount}
                internalColor="#0d7cff"
                outerColor="#5b5b5b"
                innerColor="black"
                innerCircleStyle={{ height: 86, width: 175 }}
              />
              <View style={{ width: 50 }}></View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              paddingBottom: 20
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "#F7C736",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                alignItems: "center",
                width: 138
              }}
            >
              <Text
                style={{
                  color: "#F7C736",
                  borderColor: "#F7C736",
                  borderWidth: 1,
                  padding: 3,
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Sugar
              </Text>
              <Text
                style={{
                  color: "#F7C736",
                  paddingLeft: 20,
                  paddingRight: 20,
                  padding: 10
                }}
              >
                Limit: {this.state.sugarDL}g/day{" "}
              </Text>
              <Speedometer
                value={this.state.udi.sugarCount}
                totalValue={this.state.sugarDL}
                size={100}
                text={"" + this.state.udi.sugarCount}
                internalColor="#F7C736"
                outerColor="#5b5b5b"
                innerColor="#000"
                innerCircleStyle={{ height: 38, width: 77 }}
                showIndicator
                indicatorColor="#5b0300"
              />
              <Text
                style={{
                  color: "#F7C736",
                  padding: 10
                }}
              >
                {" "}
                {this.state.udi.sugarCount}{" "}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#F7C736",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                alignItems: "center",
                width: 138
              }}
            >
              <Text
                style={{
                  color: "#F7C736",
                  borderColor: "#F7C736",
                  borderWidth: 1,
                  padding: 3,
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Caffein
              </Text>
              <Text
                style={{
                  color: "#F7C736",

                  padding: 10
                }}
              >
                Limit: {this.state.caffDL}mg/day{" "}
              </Text>
              <Speedometer
                value={this.state.udi.caffCount}
                totalValue={400}
                size={100}
                text={"" + this.state.udi.sugarCount}
                internalColor="#F7C736"
                outerColor="#5b5b5b"
                innerColor="#000"
                innerCircleStyle={{ height: 38, width: 77 }}
                showIndicator
                indicatorColor="#5b0300"
              />
              <Text
                style={{
                  color: "#F7C736",
                  padding: 10
                }}
              >
                {" "}
                {this.state.udi.sugarCount}{" "}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 6 }}>
            <View style={{ paddingRight: 20 }}>
              <Button
                title="+ Add Food"
                onPress={() => this.props.navigation.navigate("AddFood")}
              />
            </View>

            <View style={{ paddingLeft: 20 }}>
              <Button
                title="+1 Cup of Water"
                onPress={() =>
                  this.setState(prev => {
                    let udi = { ...prev.udi };
                    udi.waterCount = prev.udi.waterCount + 0.11;
                    return { udi };
                  })
                }
              />
            </View>
          </View>
          <View style={{ alignItems: "flex-end", width: "100%" }}>
            <Text style={{ color: "#fff" }}> {this.state.carbsDL}g </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Carbs
            </Text>
            <TextInput
              style={{
                backgroundColor: "black",
                color: "white",
                width: 35,
                borderWidth: 1,
                borderColor: "white",
                textAlign: "center",
                borderRadius: 5,
                padding: 3,
                marginRight: 5
              }}
              value={"" + this.state.udi.carbsCount}
              editable={false}
            />
            <Text
              style={{
                color: "white",
                marginRight: 5,
                paddingLeft: 8,
                paddingRight: 8
              }}
            >
              g
            </Text>
            <View>
              <Progress.Bar
                progress={
                  this.state.udi.carbsCount == 0
                    ? this.state.udi.carbsCount
                    : this.state.udi.carbsCount / this.state.carbsDL
                }
                width={185}
                height={10}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          <View
            style={{ alignItems: "flex-end", width: "100%", marginTop: 10 }}
          >
            <Text style={{ color: "#fff" }}> {this.state.proteinDL}g </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Protein
            </Text>
            <TextInput
              style={{
                backgroundColor: "black",
                color: "white",
                width: 35,
                borderWidth: 1,
                borderColor: "white",
                width: 35,
                textAlign: "center",
                borderRadius: 5,
                padding: 3,
                marginRight: 5
              }}
              value={"" + this.state.udi.proteinCount}
              editable={false}
            />
            <Text
              style={{
                color: "white",
                marginRight: 5,
                paddingLeft: 8,
                paddingRight: 8
              }}
            >
              g
            </Text>
            <View>
              <Progress.Bar
                progress={
                  this.state.udi.proteinCount == 0
                    ? this.state.udi.proteinCount
                    : this.state.udi.proteinCount / this.state.proteinDL
                }
                width={185}
                height={10}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>
          <View
            style={{ alignItems: "flex-end", width: "100%", marginTop: 10 }}
          >
            <Text style={{ color: "#fff" }}> {this.state.fatDL}g </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 15,
              marginRight: 15
            }}
          >
            <Text style={{ color: "white", marginRight: 5, width: 55 }}>
              Fat
            </Text>
            <TextInput
              style={{
                backgroundColor: "black",
                color: "white",
                width: 35,
                borderWidth: 1,
                borderColor: "white",
                width: 35,
                textAlign: "center",
                borderRadius: 5,
                padding: 3,
                marginRight: 5
              }}
              value={"" + this.state.udi.fatCount}
              editable={false}
            />
            <Text
              style={{
                color: "white",
                marginRight: 5,
                paddingLeft: 8,
                paddingRight: 8
              }}
            >
              g
            </Text>
            <View>
              <Progress.Bar
                progress={
                  this.state.udi.fatCount == 0
                    ? this.state.udi.fatCount
                    : this.state.udi.fatCount / this.state.fatDL
                }
                width={185}
                height={10}
                borderColor="black"
                unfilledColor="#5b5b5b"
              />
            </View>
          </View>

          <Text style={{ color: "#222" }}>
            ________________________________________________
          </Text>
          <View style={{ position: "relative" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Text
                style={{
                  color: "#fff",

                  padding: 10,
                  fontSize: 25
                }}
              >
                Your Plan
              </Text>
              <TouchableOpacity
                style={{ paddingLeft: 10, paddingTop: 4 }}
                onPress={() =>
                  this.props.navigation.navigate("SetPlan", {
                    username: this.state.username,
                    fromHome: true
                  })
                }
              >
                <FontAwesome5 name={"pen-square"} size={22} color="green" />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                position: "absolute",
                left: 0,
                top: 70,
                zIndex: 2,
                backgroundColor: "red",
                color: "#fff",
                padding: 1
              }}
            >
              Today
            </Text>
            {arr2.map(x => {
              let workoutDay = this.state.sport.find(y => y[0] == x);
              if (workoutDay) {
                return (
                  <View key={x} style={style.dayBox}>
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        padding: 10
                      }}
                    >
                      {x}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#333",
                        padding: 10,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Wake Up{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.wakeUp}
                        </Text>
                      </View>
                      {workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) <
                      this.state.dailyPlan.breakfast.substring(0, 2) +
                        this.state.dailyPlan.breakfast.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>-from-</Text>
                          <Text style={{ color: "#fff" }}>{workoutDay[1]}</Text>
                          <Text style={{ color: "#fff" }}>-to-</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay[2]}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Breakfast{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.breakfast}
                        </Text>
                      </View>
                      {workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) >
                        this.state.dailyPlan.breakfast.substring(0, 2) +
                          this.state.dailyPlan.breakfast.substring(3) &&
                      workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) <
                        this.state.dailyPlan.lunch.substring(0, 2) +
                          this.state.dailyPlan.lunch.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>--from--</Text>
                          <Text style={{ color: "#fff" }}>{workoutDay[1]}</Text>
                          <Text style={{ color: "#fff" }}>--to--</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay[2]}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Lunch</Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.lunch}
                        </Text>
                      </View>
                      {workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) >
                        this.state.dailyPlan.lunch.substring(0, 2) +
                          this.state.dailyPlan.lunch.substring(3) &&
                      workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) <
                        this.state.dailyPlan.dinner.substring(0, 2) +
                          this.state.dailyPlan.dinner.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>-from-</Text>
                          <Text style={{ color: "#fff" }}>{workoutDay[1]}</Text>
                          <Text style={{ color: "#fff" }}>-to-</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay[2]}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Dinner</Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.dinner}
                        </Text>
                      </View>
                      {workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) >
                        this.state.dailyPlan.dinner.substring(0, 2) +
                          this.state.dailyPlan.dinner.substring(3) &&
                      workoutDay[1].substring(0, 2) +
                        workoutDay[1].substring(3) <
                        this.state.dailyPlan.sleep.substring(0, 2) +
                          this.state.dailyPlan.sleep.substring(3) ? (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingBottom: 10
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              width: 85,
                              paddingLeft: 12
                            }}
                          >
                            Workout
                          </Text>
                          <Text style={{ color: "#fff" }}>-from-</Text>
                          <Text style={{ color: "#fff" }}>{workoutDay[1]}</Text>
                          <Text style={{ color: "#fff" }}>-to-</Text>
                          <Text style={{ color: "#fff", paddingRight: 12 }}>
                            {workoutDay[2]}
                          </Text>
                        </View>
                      ) : (
                        <View></View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Sleep</Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.sleep}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={x} style={style.dayBox}>
                    <Text
                      style={{
                        color: "#fff",
                        alignSelf: "center",
                        padding: 10
                      }}
                    >
                      {x}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#333",
                        padding: 10,
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Wake Up{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.wakeUp}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Breakfast{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.breakfast}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Lunch </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.lunch}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          paddingBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>
                          Dinner{" "}
                        </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.dinner}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          marginBottom: 10
                        }}
                      >
                        <Text style={{ color: "#fff", width: 65 }}>Sleep </Text>
                        <Text style={{ color: "#fff" }}>---------------</Text>
                        <Text style={{ color: "#fff" }}>
                          {this.state.dailyPlan.sleep}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  dayBox: {
    color: "#fff",
    width: 300,
    backgroundColor: "#000",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3
  },
  borderStyleTop: {
    backgroundColor: "black",
    height: "45%",
    width: "95%",
    borderRadius: 10,
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-evenly"
  },
  caloriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  numberRemaining: {
    color: "#fff",
    fontSize: 30
  },
  textRemaining: {
    color: "#fff",
    fontSize: 15
  },

  textAdiacent: {
    color: "#fff",
    fontSize: 15
  },
  numberAdiacent: {
    color: "#fff",
    fontSize: 25
  },
  eachCaloriesContainer: {
    alignItems: "center"
  },
  remainingCaloriesContainer: {
    padding: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Main;
