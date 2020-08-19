import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Slider } from 'react-native'
import Styles from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MessageIcon, PlusSquareIcon, ForwardArrowIcon } from '../../../component/Icons';
import { Grid, Col, Row } from 'react-native-easy-grid';
import _ from 'lodash';
import { EventRegister } from 'react-native-event-listeners'
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.showFilter,
            range: props.settings.range,
        }
    }

    componentDidMount = async () => {

    }

    setRangeValue = val => {     
        this.setState({
            range: val
        }, () => {
            this.props.setSearchRange(this.state.range)
        })
    }

    search = () => {
        this.props.toggleFilter();
        switch(this.props.tabType) {
            case "people":
            
            return;

            case "shops":
            return;

            case "saved":
            return;
        }
    }
    
    render() {
        if(!this.props.active) {
            return null;
        }
        return (
            <View style={LocalStyles.container}>
                <View style={Styles.alignments.horizontalCenter}>
                    <Text style={[Styles.typograhy.strong, { fontSize: 25 }]}>
                        {this.state.range < 1000 ? `${this.state.range} Meters` : "1 Km" }
                    </Text>
                </View>
                <View style={[LocalStyles.card, Styles.spacings.mTopXSmall]}>
                    <Text style={Styles.typograhy.strong}>
                        Set Search Areas Range
                    </Text>
                    <Slider
                        onValueChange = {this.setRangeValue}
                        value={this.state.range}
                        style={{width: "100%", height: 40}}
                        minimumValue={0}
                        maximumValue={1000}
                        minimumTrackTintColor="#09F"
                        maximumTrackTintColor="#09F"
                        thumbTintColor="#09F"
                        step={100}
                    />
                <View style={[Styles.alignments.row, {justifyContent: "space-between", marginTop: -12}]}>
                    <Text style={[Styles.typograhy.strong, {color: "#888", fontSize: 14}]}>Nearest (5 Meters)</Text>
                    <Text style={[Styles.typograhy.strong, {color: "#888", fontSize: 14}]}>1 Km</Text>
                </View>
                </View>
                <View style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                    <Button onPress={()=>this.search()} style={[Styles.alignments.full, LocalStyles.button]}  size='giant' status='danger' accessoryRight={ForwardArrowIcon}>
                        Set Search Range
                    </Button>
                </View>
                <TouchableOpacity style={[Styles.alignments.horizontalCenter, Styles.spacings.mTopMedium]}>
                    <Text onPress={()=>this.props.toggleFilter()} style={[Styles.typograhy.nunito, {fontSize: 18, color: "#888"}]}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        );   
    }
}5
const LocalStyles = StyleSheet.create({
    container: {
        marginBottom: 500
    },
    card: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#efefef",
        padding: 10
    }
});

export default Filter;
