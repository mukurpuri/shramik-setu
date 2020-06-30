import React from 'react';
import {View, StyleSheet} from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import { Text , Icon, Divider} from '@ui-kitten/components';
import { Card } from '../../../component/customComponents'
import { Col, Row, Grid } from "react-native-easy-grid";
import Styles from '../../../styles';

const ArrowUpIcon = (props) => (
    <Icon {...props} name='arrow-upward-outline'/>
);
const ArrowDownIcon = (props) => (
    <Icon {...props} name='arrow-downward-outline'/>
);
class TopNews extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.currentLanguage;

        return (
            <Card
                header={this.props.title}
                paddLeft={10}
                icon="trending-up"
                paddRight={10}
                paddTop={10}
                paddBottom={10}>
                <View>
                    <Grid>
                        <Row style={LocalStyles.newsContainer}>
                            <Col size={25}>
                                <Image style={LocalStyles.imagenews} source={{uri: "https://www.aljazeera.com/mritems/Images/2020/2/18/d50b54a8e0cc411790946bc9efb6f0b4_8.jpg"}}/>
                            </Col>
                            <Col size={65}>
                                <View>
                                    <Text style={Styles.typograhy.strong}>Locust Attack in Jaipur under control</Text>
                                </View>
                            </Col>
                        </Row>
                        <Divider style={Styles.spacings.mBottomXSmall}/>
                        <Row style={LocalStyles.newsContainer}>
                            <Col size={25}>
                                <Image style={LocalStyles.imagenews} source={{uri: "https://www.aljazeera.com/mritems/Images/2020/2/18/d50b54a8e0cc411790946bc9efb6f0b4_8.jpg"}}/>
                            </Col>
                            <Col size={65}>
                                <View>
                                    <Text style={Styles.typograhy.strong}>Locust Attack in Jaipur under control</Text>
                                </View>
                            </Col>
                        </Row>
                        <Divider style={Styles.spacings.mBottomXSmall}/>
                        <Row style={LocalStyles.newsContainer}>
                            <Col size={25}>
                                <Image style={LocalStyles.imagenews} source={{uri: "https://www.aljazeera.com/mritems/Images/2020/2/18/d50b54a8e0cc411790946bc9efb6f0b4_8.jpg"}}/>
                            </Col>
                            <Col size={65}>
                                <View>
                                    <Text style={Styles.typograhy.strong}>Locust Attack in Jaipur under control</Text>
                                </View>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </Card>
        );   
    }
}
const LocalStyles = StyleSheet.create({
    gridContainer: {width: "100%"},
    newsContainer: {
        height: 50,paddingBottom: 10
    },
    imagenews: {
        width: "90%",
        height: 40,
        borderRadius: 4,
    }
});
export default TopNews;
