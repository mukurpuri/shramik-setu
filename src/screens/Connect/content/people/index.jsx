import React from 'react';;
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, SafeAreaView,StyleSheet, Image } from 'react-native';
import { Text, Input, Button, Divider, Spinner, Icon } from '@ui-kitten/components';
import { Slider } from 'react-native'
import Styles from '../../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getProfilePicture } from '../../../../utilities/helpers';
import { wrap } from 'lodash';
class People extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        //let currentLanguage = this.props.settings.language;
        let People = [];
        let peopleList = [
            {
                name: "Katrina Kaif",
                source: "https://assets.mangalorean.com/2020/08/Katrina-Kaif.jpg",
                hasStatus: true
            },
            {
                name: "Mukur Puri",
                source: "https://miro.medium.com/fit/c/336/336/0*uFf4Ve2RlzGVzpkk.",
                hasStatus: false
            },
            {
                name: "John Lenon",
                source: "https://pbs.twimg.com/profile_images/1278980779842945025/b_Ym_8B__400x400.jpg",
                hasStatus: false
            },
            {
                name: "Rishmit Puri",
                source: "https://i.pinimg.com/280x280_RS/da/da/b9/dadab90238677278c099d2b9c7caa17f.jpg",
                hasStatus: false
            },
            {
                name: "Steve Jobs",
                source: "https://vignette.wikia.nocookie.net/disney/images/5/54/Steve_Jobs.jpg/revision/latest?cb=20190223220738",
                hasStatus: true
            },
            {
                name: "Prateek Kuhad",
                source: "https://c8d8q6i8.stackpathcdn.com/wp-content/uploads/2019/12/Prateek-Kuhad-Contact-Information-1.jpg",
                hasStatus: true
            },
            {
                name: "Katrina Kaif",
                source: "https://assets.mangalorean.com/2020/08/Katrina-Kaif.jpg",
                hasStatus: true
            },
            {
                name: "Mukur Puri",
                source: "https://miro.medium.com/fit/c/336/336/0*uFf4Ve2RlzGVzpkk.",
                hasStatus: false
            },
            {
                name: "John Lenon",
                source: "https://pbs.twimg.com/profile_images/1278980779842945025/b_Ym_8B__400x400.jpg",
                hasStatus: false
            },
            {
                name: "Rishmit Puri",
                source: "https://i.pinimg.com/280x280_RS/da/da/b9/dadab90238677278c099d2b9c7caa17f.jpg",
                hasStatus: false
            },
            {
                name: "Steve Jobs",
                source: "https://vignette.wikia.nocookie.net/disney/images/5/54/Steve_Jobs.jpg/revision/latest?cb=20190223220738",
                hasStatus: true
            },
            {
                name: "Prateek Kuhad",
                source: "https://c8d8q6i8.stackpathcdn.com/wp-content/uploads/2019/12/Prateek-Kuhad-Contact-Information-1.jpg",
                hasStatus: true
            },
            {
                name: "Katrina Kaif",
                source: "https://assets.mangalorean.com/2020/08/Katrina-Kaif.jpg",
                hasStatus: true
            },
            {
                name: "Mukur Puri",
                source: "https://miro.medium.com/fit/c/336/336/0*uFf4Ve2RlzGVzpkk.",
                hasStatus: false
            },
            {
                name: "John Lenon",
                source: "https://pbs.twimg.com/profile_images/1278980779842945025/b_Ym_8B__400x400.jpg",
                hasStatus: false
            },
            {
                name: "Rishmit Puri",
                source: "https://i.pinimg.com/280x280_RS/da/da/b9/dadab90238677278c099d2b9c7caa17f.jpg",
                hasStatus: false
            },
            {
                name: "Steve Jobs",
                source: "https://vignette.wikia.nocookie.net/disney/images/5/54/Steve_Jobs.jpg/revision/latest?cb=20190223220738",
                hasStatus: true
            },
            {
                name: "Prateek Kuhad",
                source: "https://c8d8q6i8.stackpathcdn.com/wp-content/uploads/2019/12/Prateek-Kuhad-Contact-Information-1.jpg",
                hasStatus: true
            }
        ]
        _.each(peopleList, (p,e) => {
            People.push(
                <View key={`prop-peope-${e}`} style={[LocalStyles.peopleCard]}>
                    <View style={LocalStyles.avatar}>
                        <View>
                            <Image style={[LocalStyles.peopleAv, p.hasStatus ? LocalStyles.statusAv: {}]} source={{uri: p.source }}/>
                        </View>
                    </View>
                    <View style={LocalStyles.name}>
                        <Text style={[Styles.typograhy.strong, Styles.typograhy.center]}>
                            {p.name}
                        </Text>
                    </View>
                </View>
            )
        })
        return (
            <View style={{paddingBottom: 100, marginTop: 20}}>
                <View style={LocalStyles.gridRow}>
                    {People}
                </View>
            </View>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    peopleCard: {
        height: 100, width: "31.66%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginBottom:60,
    },
    gap: {
        width: "2.5%"
    },
    gridRow: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    avatar: {
        width: 85,
        height: 85,
        borderRadius: 100,
        backgroundColor: "white",
        borderColor: "#efefef",
        borderWidth: 1,
    },
    name: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    peopleAv: {
        width: 75,
        height: 75,
        borderRadius: 100,
        top: 4.1,
        left: 4.1,
    },
    statusAv: {
        borderWidth: 3,
        borderColor: "#E91E62"
    }
});
export default People;
