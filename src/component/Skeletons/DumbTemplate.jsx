import React from 'react';
import { Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

class DUMB_COMPONENT extends React.Component {
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
  
export default DUMB_COMPONENT;
