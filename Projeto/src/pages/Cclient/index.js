import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

const CadastroUsuarioScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [senhaValid, setSenhaValid] = useState(false);

  const cadastrarUsuario = () => {
    if (emailValid && senhaValid) {
      axios
       .post('http://localhost/cadastro_cliente.php', {
          email: email,
          senha: senha,
          endereco: endereco,
          cpf: cpf,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
       .then(response => {
          console.log(response.data);
          // Faça algo após o cadastro bem-sucedido
        })
       .catch(error => {
          console.error(error);
        });
    } else {
      Alert.alert(
        'Atenção',
        'Por favor, preencha corretamente o email e a senha.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastre Um Cliente(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email:</Text>
        <TextInput 
          placeholder="Digite um Email..." 
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (text.length > 0 && text.includes('@')) {
              setEmailValid(true);
            } else {
              setEmailValid(false);
            }
          }}
          style={styles.input}
        />

        <Text style={styles.title}>Senha:</Text>
        <TextInput 
          placeholder="Digite sua senha..." 
          value={senha}
          onChangeText={text => {
            setSenha(text);
            if (text.length > 5) {
              setSenhaValid(true);
            } else {
              setSenhaValid(false);
            }
          }}
          style={styles.input}
        />

        <Text style={styles.title}>Endereço:</Text>
        <TextInput 
          placeholder="Digite seu Endereço..." 
          value={endereco}
          onChangeText={text => setEndereco(text)}
          style={styles.input}
        />

        <Text style={styles.title}>CPF:</Text>
        <TextInput 
          placeholder="Digite seu CPF..." 
          value={cpf}
          onChangeText={text => setCpf(text)}
          style={styles.input}
        />

        <TouchableOpacity title="Cadastrar" onPress={cadastrarUsuario} style={styles.button}>
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

export default CadastroUsuarioScreen;