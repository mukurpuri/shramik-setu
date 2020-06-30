import { StyleSheet } from 'react-native';
const Alignments = StyleSheet.create({
    row: {
      flexDirection: "row"
    },
    column: {
      flexDirection: "column"
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
    }
});
export default Alignments
  