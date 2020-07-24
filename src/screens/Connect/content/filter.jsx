import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Slider } from 'react-native'
import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MessageIcon, PlusSquareIcon } from '../../../component/Icons';
import { Grid, Col, Row } from 'react-native-easy-grid';
import _ from 'lodash';
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.showFilter
        }
    }

    componentDidMount = async () => {

    }
    
    render() {
        if(!this.props.active) {
            return null;
        }
        return (
            <View style={LocalStyles.container}>
                <View style={LocalStyles.card}>
                <Text style={Styles.typograhy.strong}>
                            Set Search Areas Range
                        </Text>
                <Slider
                    style={{width: "100%", height: 40}}
                    minimumValue={1}
                    maximumValue={25}
                    minimumTrackTintColor="#09F"
                    maximumTrackTintColor="#09F"
                    thumbTintColor="#09F"
                />
                <View style={[Styles.alignments.row, {justifyContent: "space-between", marginTop: -12}]}>
                    <Text style={[Styles.typograhy.strong, {color: "#888", fontSize: 14}]}>0 KM</Text>
                    <Text style={[Styles.typograhy.strong, {color: "#888", fontSize: 14}]}>All Jaipur</Text>
                </View>
                </View>
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    container: {
        minHeight: 700,
    },
    card: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        padding: 10
    }
});

export default Filter;
