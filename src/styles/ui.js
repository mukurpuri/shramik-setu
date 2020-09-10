import { StyleSheet } from 'react-native';
const UI = StyleSheet.create({
    card: {
      backgroundColor: "white",
      width: "100%",
      minHeight: 40,
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: "#ecebeb"
    },
    peopleTick: {
      width: 15,
      height: 15,
      marginLeft: 2,
      marginTop :4
    },
    headerTick: {
      width: 17,
      height: 17,
      position: "absolute",
      top: -30,
      left: -7

    },
    ShopTick: {
      width: 15,
      height: 15,
      marginTop : 6,
      marginLeft: 5
    },
    redBulb: {
        backgroundColor: "red",
        width: 20,
        height: 20,
        borderRadius: 100,
        position: "absolute",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        right: 30,
        top: 11,
        zIndex: 1
    },
    bulbText: {
        color: "white",
        fontSize: 11,
        fontFamily: "nunito-bold",
    }
});
export default UI
  