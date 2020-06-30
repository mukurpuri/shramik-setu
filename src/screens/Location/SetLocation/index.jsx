import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Layout, View, StyleSheet, Image } from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";

import { Text, Input, Button, Icon } from '@ui-kitten/components';

import  Wrapper from '../../../component/Wrapper';
import Language from '../../../config/languages/Language';
import { LocationIcon, SearchIcon,  HomeIcon } from '../../../component/Icons';
import Styles from '../../../styles';

import Footer from '../../../component/Footer';
import { LocationMarker } from '../../../config/Images';

class SetLocation extends React.Component {
    constructor(props) {
        super(props);
    }

    setLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
              const location = JSON.stringify(position);
      
              this.setState({ location }, () => {
              });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
          <Wrapper>
            <View>
            <Grid>
              <Row style={[Styles.spacings.mTopXLarge]}>
                <View style={[Styles.alignments.verticalCenter]}>
                    <Image style={[LocalStyles.image]} source={LocationMarker}/>
                    <Text style={[Styles.strong, Styles.spacings.mTopMedium]} category="h5">{Language.get("location", "title", currentLanguage)}</Text>
                    <Grid style={[LocalStyles.container, Styles.spacings.mTopSmall]}>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[1]}</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[0]}</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.spacings.mTopSmall]}>
                        <Col size={12}>
                            <Icon style={LocalStyles.icon} fill='#5bb75b' name="checkmark-square-2-outline" />
                        </Col>
                        <Col size={88}>
                            <Text style={LocalStyles.listText}>{Language.get("location", "list", currentLanguage)[2]}</Text>
                        </Col>
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopMedium]}>
                        <Button onPress={() => this.setLocation()} style={[Styles.alignments.full, LocalStyles.button, Styles.spacings.mTopMedium]}  size='giant' status='primary' accessoryRight={LocationIcon}>
                            {Language.get("location","button",currentLanguage)}
                         </Button>
                        </Row>
                        <Row style={[Styles.strong, Styles.spacings.mTopXSmall]}>
                        <Button onPress={() => this.setLocation()} style={[Styles.alignments.full, LocalStyles.button, Styles.spacings.mTopMedium]}  size='giant' status='danger' accessoryRight={HomeIcon}>
                            {Language.get("location","buttonAddress",currentLanguage)}
                         </Button>
                        </Row>
                    </Grid>
                </View>
              </Row>
            </Grid>
            </View>
            <Footer/>
          </Wrapper>
        );   
    }
}


const LocalStyles = StyleSheet.create({
    image: { width: 60, height: 50},
    icon: { width: 22, height: 22, },
    container: { width: "85%" },
    listText: { fontSize: 16, fontWeight: "bold" }
});

const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SetLocation);

