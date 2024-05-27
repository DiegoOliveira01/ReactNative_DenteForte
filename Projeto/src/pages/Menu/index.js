import { ScrollView } from 'react-native';
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

export default function Menu(){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Escolha Uma Opção</Text>
            </Animatable.View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20}}>
            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.buttonTextAbove}>Área Do Cliente</Text>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Cclient')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/adicionar-usuario.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Cadastro De Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Gclient')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/do-utilizador.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Gerenciamento De Cliente</Text>
            </TouchableOpacity>

            <Text style={styles.buttonTextAbove}>Àrea Do Funcionário</Text>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Cfunctionary')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/adicionar-usuario.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Cadastro De Funcionário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Gfunctionary')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/do-utilizador.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Gerenciamento De Funcionário</Text>
            </TouchableOpacity>
            
            <Text style={styles.buttonTextAbove}>Àrea De Agendamento</Text>

            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Cconsultation')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/calendario_adicionar.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Agendar Consulta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Gconsultation')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/calendario_gerenciar.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Gerenciar Consulta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button_deslogar} onPress={ () => navigation.navigate('Welcome')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/deslogar.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Deslogar</Text>
            </TouchableOpacity>

            </Animatable.View>
            </ScrollView>
            
            
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
    iconimage:{
        width: 35,
        height: 35,
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
    button_deslogar:{
        backgroundColor: '#CD4242',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 54,
        justifyContent: 'center',
        alignItems: 'center',
    },
})