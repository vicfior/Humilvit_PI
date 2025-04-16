import React, {useRef, useState} from 'react';
import { View, DrawerLayoutAndroid, Text } from 'react-native';

export default function DrawerContent(props) {
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState('left');
    
    return (
        <View>
            <Text>DrawerContent</Text>
        </View>
    );
}