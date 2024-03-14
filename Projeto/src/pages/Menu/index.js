import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Menu(){
    return(
        <View style={styles.container}>
            <Text>Sim</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#38a69d",
    },
})