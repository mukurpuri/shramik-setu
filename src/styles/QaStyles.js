import { StyleSheet } from 'react-native';
const QaStyles = StyleSheet.create({
    voteMetric: {
        marginLeft: 5,
        flexDirection: "row",
        height: 42,
        alignContent: "center",
        justifyContent: "center",
    },
    actionBorder: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ebebeb",
        borderRadius: 5,
        height: 42,
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    up: {
        backgroundColor: "#47c947"
    },
    down: {
        backgroundColor: "#ff6565"
    },
    upColor: {
        color: "#47c947"
    },
    downColor: {
        color: "#ff6565"
    },
    flag: {
        backgroundColor: "#c550c5"
    },
    flagColor: {
        color: "#c550c5"
    },
    bookmark: {
        backgroundColor: "gold"
    },
    bookmarkColor: {
        color: "gold"
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
    answer: {
        fontSize: 18,
        fontFamily: "nunito"
    },
    actionText: {
        fontFamily: "nunito-bold",
        color: "#555",
        fontSize: 12,
        marginLeft: 5,
        top: 2
    },
    answerContainer: {
        minHeight: 80,
        padding: 10
    },
    answerReaction: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    postParams: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        position: "relative",
        width: "100%",
    },
    answerReactionButton: {
        minWidth: 80,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 3,
        borderWidth: 0
    },
    qaReactionButton: {
        minWidth: 80,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 3,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#d9d8d8",
        marginRight: 10,
    },
    qaReactionButtonActive: {
        backgroundColor: "#09F",
        borderColor: "#09F",
    },
    answerAction: {
        width: 20,
        height: 20 ,
        top:1
    },
    answerActionText :{
        fontFamily: "nunito-bold",
        color: "#555",
        fontSize: 14,
        marginLeft: 5,
        top: 2
    },
    answerReactionButtonActive: {
        backgroundColor: "#09F",
        borderTopWidth: 2,
        borderTopColor: "#09F"
    },
    answerActionTextActive: {
        color : "#fff"
    },
    prayEmojiIcon: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ecebeb"
    },
    giveAnswerButton: {
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ebebeb",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignContent: "center",
        justifyContent: "center"
    },
    giveAnswerButtonText: {
        fontFamily: "nunito-bold"
    }
});
export default QaStyles
  