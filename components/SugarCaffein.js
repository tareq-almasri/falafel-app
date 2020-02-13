import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Speedometer from "react-native-speedometer-chart";

export function NormalSugar(props) {
  return (
    <View style={style.containerNormal}>
      <Text style={style.textNormal}>Sugar</Text>
      <Text
        style={{
          color: "#F7C736",
          padding: 10
        }}
      >
        Limit: {props.sugarDL}g/day{" "}
      </Text>
      <Speedometer
        value={props.sugarCount}
        totalValue={props.sugarDL}
        size={100}
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
        {props.sugarCount}{" "}
      </Text>
    </View>
  );
}
export function NormalCaff(props) {
  return (
    <View style={style.containerNormal}>
      <Text style={style.textNormal}>Caffein</Text>
      <Text
        style={{
          color: "#F7C736",

          padding: 10
        }}
      >
        Limit: {props.caffDL}mg/day{" "}
      </Text>
      <Speedometer
        value={props.caffCount}
        totalValue={props.caffDL}
        size={100}
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
        {props.caffCount}{" "}
      </Text>
    </View>
  );
}

export function AttentionSugar(props) {
  return (
    <View style={style.containerAttention}>
      <Text style={style.textAttention}>ATTENTION</Text>
      <Text style={style.textAttention}>Sugar</Text>
      <Text
        style={{
          color: "#f46739",
          padding: 10
        }}
      >
        Limit: {props.sugarDL}g/day{" "}
      </Text>
      <Speedometer
        value={props.sugarCount}
        totalValue={props.sugarDL}
        size={100}
        internalColor="#f46739"
        outerColor="#5b5b5b"
        innerColor="#000"
        innerCircleStyle={{ height: 38, width: 77 }}
        indicatorColor="#5b0300"
      />
      <View style={{ position: "absolute", left: 57, bottom: 35 }}>
        <FontAwesome5 name={"exclamation-triangle"} color="#f46739" size={18} />
      </View>

      <Text style={{ color: "#f46739", padding: 10 }}>
        {" "}
        {props.sugarCount}{" "}
      </Text>
    </View>
  );
}
export function AttentionCaff(props) {
  return (
    <View style={style.containerAttention}>
      <Text style={style.textAttention}>ATTENTION</Text>
      <Text style={style.textAttention}>Caffein</Text>
      <Text style={{ color: "#f46739", padding: 10 }}>
        Limit: {props.caffDL}mg/day{" "}
      </Text>
      <Speedometer
        value={props.caffCount}
        totalValue={props.caffDL}
        size={100}
        internalColor="#f46739"
        outerColor="#5b5b5b"
        innerColor="#000"
        innerCircleStyle={{ height: 38, width: 77 }}
        indicatorColor="#5b0300"
      />
      <View style={{ position: "absolute", left: 57, bottom: 35 }}>
        <FontAwesome5 name={"exclamation-triangle"} color="#f46739" size={18} />
      </View>

      <Text style={{ color: "#f46739", padding: 10 }}> {props.caffCount} </Text>
    </View>
  );
}

export function WarningSugar(props) {
  return (
    <View style={style.containerWarning}>
      <Text style={style.textWarning}>WARNING</Text>
      <Text style={style.textWarning}>Sugar</Text>
      <Text style={{ color: "#c6352c", padding: 10 }}>
        Limit: {props.sugarDL}mg/day{" "}
      </Text>
      <Speedometer
        value={props.sugarCount}
        totalValue={props.sugarDL}
        size={100}
        internalColor="#c6352c"
        outerColor="#5b5b5b"
        innerColor="#000"
        innerCircleStyle={{ height: 38, width: 77 }}
        indicatorColor="#5b0300"
      />
      <View style={{ position: "absolute", left: 60, bottom: 35 }}>
        <FontAwesome5 name={"skull-crossbones"} color="#c6352c" size={18} />
      </View>

      <Text style={{ color: "#c6352c", padding: 10 }}>
        {" "}
        {props.sugarCount}{" "}
      </Text>
    </View>
  );
}

export function WarningCaff(props) {
  return (
    <View style={style.containerWarning}>
      <Text style={style.textWarning}>WARNING</Text>
      <Text style={style.textWarning}>Caffein</Text>
      <Text style={{ color: "#c6352c", padding: 10 }}>
        Limit: {props.caffDL}mg/day{" "}
      </Text>
      <Speedometer
        value={props.caffCount}
        totalValue={props.caffDL}
        size={100}
        internalColor="#c6352c"
        outerColor="#5b5b5b"
        innerColor="#000"
        innerCircleStyle={{ height: 38, width: 77 }}
        indicatorColor="#5b0300"
      />
      <View style={{ position: "absolute", left: 60, bottom: 35 }}>
        <FontAwesome5 name={"skull-crossbones"} color="#c6352c" size={18} />
      </View>

      <Text
        style={{
          color: "#c6352c",
          padding: 10
        }}
      >
        {" "}
        {props.caffCount}{" "}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  containerNormal: {
    borderWidth: 1,
    borderColor: "#F7C736",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    width: 138
  },
  textNormal: {
    color: "#F7C736",
    borderColor: "#F7C736",
    borderWidth: 1,
    padding: 3,
    width: "100%",
    textAlign: "center"
  },
  containerAttention: {
    borderWidth: 1,
    borderColor: "#f46739",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    width: 138,
    position: "relative"
  },
  textAttention: {
    color: "#f46739",
    borderColor: "#f46739",
    borderWidth: 1,
    padding: 3,
    width: "100%",
    textAlign: "center"
  },
  containerWarning: {
    borderWidth: 1,
    borderColor: "#c6352c",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    width: 138
  },
  textWarning: {
    color: "#c6352c",
    borderColor: "#c6352c",
    borderWidth: 1,
    padding: 3,
    width: "100%",
    textAlign: "center"
  }
});
