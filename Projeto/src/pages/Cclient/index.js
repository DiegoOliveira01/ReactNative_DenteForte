import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

import * as Animatable from 'react-native-animatable'

import { useNavigation } from '@react-navigation/native'

const bairros = [
  { label: 'Badu', value: 'Badu' },
  { label: 'Baldeador', value: 'Baldeador' },
  { label: 'Barreto', value: 'Barreto' },
  { label: 'Bairro de Fátima', value: 'Bairro de Fátima' },
  { label: 'Boa Viagem', value: 'Boa Viagem' },
  { label: 'Cachoeiras', value: 'Cachoeiras' },
  { label: 'Cafubá', value: 'Cafubá' },
  { label: 'Camboinhas', value: 'Camboinhas' },
  { label: 'Cantagalo', value: 'Cantagalo' },
  { label: 'Caramujo', value: 'Caramujo' },
  { label: 'Centro', value: 'Centro' },
  { label: 'Charitas', value: 'Charitas' },
  { label: 'Cubango', value: 'Cubango' },
  { label: 'Engenhoca', value: 'Engenhoca' },
  { label: 'Engenho do Mato', value: 'Engenho do Mato' },
  { label: 'Fonseca', value: 'Fonseca' },
  { label: 'Gragoatá', value: 'Gragoatá' },
  { label: 'Icaraí', value: 'Icaraí' },
  { label: 'Ilha da Conceição', value: 'Ilha da Conceição' },
  { label: 'Ingá', value: 'Ingá' },
  { label: 'Itacoatiara', value: 'Itacoatiara' },
  { label: 'Itaipu', value: 'Itaipu' },
  { label: 'Ititioca', value: 'Ititioca' },
  { label: 'Jacaré', value: 'Jacaré' },
  { label: 'Jardim Imbuí', value: 'Jardim Imbuí' },
  { label: 'Jurujuba', value: 'Jurujuba' },
  { label: 'Largo da Batalha', value: 'Largo da Batalha' },
  { label: 'Maceió', value: 'Maceió' },
  { label: 'Maria Paula', value: 'Maria Paula' },
  { label: 'Maravista', value: 'Maravista' },
  { label: 'Matapaca', value: 'Matapaca' },
  { label: 'Morro do Estado', value: 'Morro do Estado' },
  { label: 'Muriqui', value: 'Muriqui' },
  { label: 'Pé Pequeno', value: 'Pé Pequeno' },
  { label: 'Piratininga', value: 'Piratininga' },
  { label: 'Ponta d\'Areia', value: 'Ponta d\'Areia' },
  { label: 'Rio do Ouro', value: 'Rio do Ouro' },
  { label: 'São Domingos', value: 'São Domingos' },
  { label: 'São Francisco', value: 'São Francisco' },
  { label: 'São Lourenço', value: 'São Lourenço' },
  { label: 'Santa Bárbara', value: 'Santa Bárbara' },
  { label: 'Santa Rosa', value: 'Santa Rosa' },
  { label: 'Santana', value: 'Santana' },
  { label: 'Santo Antônio', value: 'Santo Antônio' },
  { label: 'Sapê', value: 'Sapê' },
  { label: 'Serra Grande', value: 'Serra Grande' },
  { label: 'Tenente Jardim', value: 'Tenente Jardim' },
  { label: 'Várzea das Moças', value: 'Várzea das Moças' },
  { label: 'Viçoso Jardim', value: 'Viçoso Jardim' },
  { label: 'Vila Progresso', value: 'Vila Progresso' },
  { label: 'Viradouro', value: 'Viradouro' },
  { label: 'Vital Brazil', value: 'Vital Brazil' },
  { label: 'Outro', value: 'Outro' },
];

const CadastroClienteScreen = () => {
  const [nome, setNome] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data_nascimento, setData_nascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const cadastrarCliente = () => {
    if (emailValid) {
      axios
       .post('http://localhost/cadastro_cliente.php', {
        nome: nome,
        bairro: selectedBairro,
        email: email,
        telefone: telefone,
        data_nascimento: data_nascimento,
        cpf: cpf,
        observacoes: observacoes,
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
        <Text style={styles.title}>Nome:</Text>
        <TextInput 
          placeholder="Digite o nome do cliente..." 
          value={nome}
          onChangeText={text => setNome(text)}
          style={styles.input}
        />

        <Text style={styles.title}>Bairro:</Text>
        <RNPickerSelect
          placeholder={{ label: 'Selecione um bairro', value: '' }}
          onValueChange={(value) => setSelectedBairro(value)}
          items={bairros}
          style={pickerSelectStyles}
        />

        <Text style={styles.title}>Email:</Text>
        <TextInput 
          placeholder="Digite o bairro do cliente..." 
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

        <Text style={styles.title}>Telefone:</Text>
        <TextInput 
          placeholder="Digite o telefone do cliente..." 
          value={telefone}
          onChangeText={text => setTelefone(text)}
          style={styles.input}
        />

        <Text style={styles.title}>Data de Nascimento:</Text>
        <TextInput 
          placeholder="Digite a data de nascimento do cliente..." 
          value={data_nascimento}
          onChangeText={text => setData_nascimento(text)}
          style={styles.input}
        />

        <Text style={styles.title}>CPF:</Text>
        <TextInput 
          placeholder="Digite o CPF do cliente..." 
          value={cpf}
          onChangeText={text => setCpf(text)}
          style={styles.input}
        />

        <Text style={styles.title}>Observações:</Text>
        <TextInput 
          placeholder="Digite as observações do cliente..." 
          value={observacoes}
          onChangeText={text => setObservacoes(text)}
          style={styles.input_obs}
        />

        <TouchableOpacity title="Cadastrar" onPress={cadastrarCliente} style={styles.button}>
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
  input_obs:{
    borderBottomWidth: 1,
    height: 80,
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default CadastroClienteScreen;
