import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Text } from '@ui-kitten/components';

class NAME_COMPONENT extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let currentLanguage = this.props.settings.language;
        return (
         <Text>Goes here</Text>
        );   
    }
}
const mapStateToProps = state => {
  return {
    settings: state.settingsReducer.settings
  };
};
  
const mapDispatchToProps = (dispatch) => {
    return {

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NAME_COMPONENT);
