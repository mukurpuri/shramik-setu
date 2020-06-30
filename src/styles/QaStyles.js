import { StyleSheet } from 'react-native';
const QaStyles = StyleSheet.create({
    actionBorder: {
        borderRadius: 10,
        marginLeft: 5,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ebebeb",
        borderRadius: 20,
        height: 22
    },
    questionContainer: {
        width: "100%",
        backgroundColor: "white",
        borderColor: "#ecebeb",
        borderWidth: 1,
        borderRadius: 4,
    },
    primaryAnswerContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        position: "relative",
    },
    readMoreText: {
        color: "#09f",
        fontSize:13,
        fontFamily: "nunito-bold",
        textAlign: "right"
    },
    readMore: {
        width: 40,
        height: 20,
        backgroundColor: "rgba(255, 255, 255, 0.7803921568627451)",
        position: "absolute",
        right: 15,
        bottom: 0
    },
    questionerDP: {
        width: "100%",
        height: 45,
        borderRadius: 100,
    },
    questionAnswer: {
        fontFamily: "nunito-bold",
        fontSize: 12,
        color: "#48a868"
    },
    action: {
        width: 15,
        height: 15,
        marginLeft: 10,
        top: 3
    },
    primaryAnswer: {
        fontSize: 14,
        fontFamily: "nunito"
    },
    actionText: {
        fontFamily: "nunito-bold",
        color: "#555",
        fontSize: 12,
        marginLeft: 5,
        top: 2
    }
});
export default QaStyles
  