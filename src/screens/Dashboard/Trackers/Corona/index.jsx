import React from 'react';
import {View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import { Card } from '../../../../component/customComponents'
import { Col, Row, Grid } from "react-native-easy-grid";
import Styles from '../../../../styles';

const ArrowUpIcon = (props) => (
    <Icon {...props} name='arrow-upward-outline'/>
);
const ArrowDownIcon = (props) => (
    <Icon {...props} name='arrow-downward-outline'/>
);
class CoronaTracker extends React.Component {
    constructor(props) {
        super(props);
    }

    numberWithCommas = x => {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }

    getArrowIcon = (type, color) => {
        switch(type) {
            case "up":
            return <ArrowUpIcon style={LocalStyles.icon} fill={color}/>

            case "down":
            return <ArrowDownIcon style={LocalStyles.icon} fill={color}/>
        }
    }
    
    render() {
        let currentLanguage = this.props.currentLanguage;
        let { data } = this.props;
        let coronaData = {
            confirmed: {
                delta: data.delta && data.delta.confirmed ? this.numberWithCommas(data.delta.confirmed) : "",
                total: data.total && data.total.confirmed ? this.numberWithCommas(data.total.confirmed) : ""
            },
            active: {
                total: data.total && data.total.confirmed && data.total.recovered && data.total.deceased ?  this.numberWithCommas((parseInt(data.total.confirmed) - ((parseInt(data.total.recovered) + parseInt(data.total.deceased))))) : "",
            },
            recovered: {
                delta: data.delta && data.delta.recovered ? this.numberWithCommas(data.delta.recovered) : "",
                total: data.total && data.total.recovered ? this.numberWithCommas(data.total.recovered) : "",
            },
            deceased: {
                delta: data.delta && data.delta.deceased ? this.numberWithCommas(data.delta.deceased) : "",
                total: data.total && data.total.deceased ? this.numberWithCommas(data.total.deceased) : "",
            }
        }

        return (
            <Card
                header={this.props.title}
                paddLeft={10}
                icon="bar-chart-2-outline"
                paddRight={10}
                paddTop={10}
                paddBottom={10}>
                <View>
                    <Grid>
                        <Col size={25}>
                            <Row style={Styles.alignments.horizontalCenter}>
                                <View style={{flexDirection: "column"}}>
                                    <View style={{flexDirection: "row", justifyContent: "center"}}><View><Text style={{fontFamily: "nunito-bold", fontSize: 12, color: "#ff073a"}}>{coronaData.confirmed.delta}</Text></View><View>{ coronaData.confirmed.delta ? this.getArrowIcon("up", "#ff073a") : null }</View></View>
                                    <View><Text style={LocalStyles.red}>{coronaData.confirmed.total}</Text></View>
                                    <View style={{flexDirection: "row"}}><View><Text style={LocalStyles.redLabel}>Confirmed</Text></View></View>
                                </View>
                            </Row>
                        </Col>
                        <Col size={25}>
                            <Row style={Styles.alignments.horizontalCenter}>
                                <View style={{flexDirection: "column"}}>
                                    <View style={{flexDirection: "row", justifyContent: "center"}}><View><Text style={{fontFamily: "nunito-bold", fontSize: 12, color: "#007bff"}}></Text></View></View>
                                    <View><Text style={LocalStyles.blue}>{coronaData.active.total}</Text></View>
                                    <View style={{flexDirection: "row"}}>
                                        <View><Text style={LocalStyles.blueLabel}>Active</Text></View>
                                    </View>
                                </View>
                            </Row>
                        </Col>
                        <Col size={25}>
                            <Row style={Styles.alignments.horizontalCenter}>
                                <View style={{flexDirection: "column"}}>
                                    <View style={{flexDirection: "row", justifyContent: "center"}}><View><Text style={{fontFamily: "nunito-bold", fontSize: 12, color: "#28a745"}}>{coronaData.recovered.delta}</Text></View><View>{ coronaData.recovered.delta ? this.getArrowIcon("up", "#28a745") : null }</View></View>
                                    <View><Text style={LocalStyles.green}>{coronaData.recovered.total}</Text></View>
                                    <View style={{flexDirection: "row"}}><View><Text style={LocalStyles.greenLabel}>Recovered</Text></View></View>
                                </View>
                            </Row>
                        </Col>
                        <Col size={25}>
                            <Row style={Styles.alignments.horizontalCenter}>
                                <View style={{flexDirection: "column"}}>
                                    <View style={{flexDirection: "row", justifyContent: "center"}}><View><Text style={{fontFamily: "nunito-bold", fontSize: 12, color: "#6c757d"}}>{coronaData.deceased.delta}</Text></View><View>{ coronaData.deceased.delta ? this.getArrowIcon("up", "#6c757d") : null }</View></View>
                                    <View><Text style={{textAlign: "center"}}><Text style={LocalStyles.black}>{coronaData.deceased.total}</Text></Text></View>
                                    <View style={{flexDirection: "row"}}>
                                        <View><Text style={LocalStyles.blackLabel}>Deceased</Text></View>
                                    </View>
                                </View>
                            </Row>
                        </Col>
                    </Grid>
                </View>
            </Card>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    redLabel: {
        fontSize: 12,
        fontFamily: "nunito-bold",
        color: "#ff073a",
        textAlign: "center",
    },
    blueLabel: {
        fontSize: 12,
        fontFamily: "nunito-bold",
        color: "#007bff",
        textAlign: "center",
    },
    greenLabel: {
        color: "#28a745",
        textAlign: "center",
        fontSize: 12,
        fontFamily: "nunito-bold"
    },
    blackLabel: {
        color: "#6c757d",
        textAlign: "center",
        fontSize: 12,
        fontFamily: "nunito-bold"
    },
    red: {
        color: "#ff073a",
        textAlign: "center",
        fontSize: 17,
        fontFamily: "nunito-bold",
    },
    blue: {
        color: "#007bff",
        textAlign: "center",
        fontSize: 17,
        fontFamily: "nunito-bold",
    },
    green: {
        color: "#28a745",
        textAlign: "center",
        fontSize: 17,
        fontFamily: "nunito-bold",
    },
    black: {
        color: "#6c757d",
        textAlign: "center",
        fontSize: 17,
        fontFamily: "nunito-bold",
    },
    gridContainer: {width: "100%"},
    icon: {
        width: 12,
        height: 12,
        top: 3
      },
});
export default CoronaTracker;
