import { StyleSheet } from 'react-native';
const Alignments = StyleSheet.create({
    row: {
      flexDirection: "row"
    },
    column: {
      flexDirection: "column",
      width: "100%"
    },
    verticalCenter: {
      alignItems: "center",
      width: "100%"
    },
    horizontalCenter: {
      justifyContent: "center",
      flexDirection: "row"
    },
    full: {
      width: "100%"
    },
    textCenter: {
      textAlign: "center"
    },
    rel: {
      position: "relative"
    }
});
export default Alignments
  