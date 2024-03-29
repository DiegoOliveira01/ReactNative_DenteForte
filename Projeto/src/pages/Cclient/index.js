import React from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Cclient(){


return(
    <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Cadastre Um Cliente(a)</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>Email:</Text>
                <TextInput 
                placeholder="Digite um Email..." 
                style={styles.input}> 
                </TextInput>
                <Text style={styles.title}>Senha:</Text>
                <TextInput 
                placeholder="Digite sua senha..." 
                style={styles.input}>
                </TextInput>
                <TouchableOpacity style={styles.button}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/seta-direita.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </Animatable.View>
    </View>
)
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#38a69d",
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm:{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title:{
        fontSize: 20,
        marginTop: 28,
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button:{
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconimage:{
        width: 35,
        height: 35,
    },

})