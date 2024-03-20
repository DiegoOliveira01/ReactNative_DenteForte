import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Menu(){
    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Escolha Uma Opção</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.buttonTextAbove}>Cadastro De Cliente</Text>
            <TouchableOpacity style={styles.button}>
                <Text styles={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
            <Text style={styles.buttonTextAbove}>Gerenciamento De Cliente</Text>
            <TouchableOpacity style={styles.button}>
                <Text styles={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <Text style={styles.buttonTextAbove}>Cadastro De Funcionários</Text>
            <TouchableOpacity style={styles.button}>
                <Text styles={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
            <Text style={styles.buttonTextAbove}>Gerenciamento De Funcionários</Text>
            <TouchableOpacity style={styles.button}>
                <Text styles={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
            </Animatable.View>
            
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#38a69d",
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center',
    },
    containerForm:{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    buttonTextAbove:{
        textAlign: "center",
        fontSize: 16,
        fontWeight: 'bold',
        color:'#000',
        marginTop: 20,
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
})