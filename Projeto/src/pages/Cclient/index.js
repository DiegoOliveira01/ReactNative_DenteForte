import { ScrollView } from 'react-native';
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text'

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
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefone_emergencia, setTelefone_Emergencia] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [emailValid, setEmailValid] = useState(false);  
  const [nomeValid, setNomeValid] = useState(false); 
  const [telefoneValid, setTelefoneValid] = useState(false); 
  const [telefone_emergenciaValid, setTelefone_EmergenciaValid] = useState(false);
  const [data_nascimentoValid, setData_NascimentoValid] = useState(false);
  const [cpfValid, setCpfValid] = useState(false);
  const [observacoesValid, setObservacoesValid] = useState(true);

  
    
  const cadastrarCliente = () => {
    if (emailValid && nomeValid && telefoneValid && telefone_emergenciaValid && data_nascimentoValid && cpfValid && observacoesValid) {
      axios
       .post('http://192.168.1.110/cadastro_cliente.php', {
        nome: nome,
        bairro: selectedBairro,
        email: email,
        telefone: telefone,
        telefone_emergencia: telefone_emergencia,
        dataNascimento: dataNascimento,
        cpf: cpf,
        observacoes: observacoes,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
       .then(response => {
          console.log(response.data);
          // Limpar campos de entrada
          setNome('');
          setSelectedBairro('');
          setEmail('');
          setTelefone('');
          setTelefone_Emergencia('');
          setDataNascimento('');
          setCpf('');
          setObservacoes('');
        })
       .catch(error => {
          console.error(error);
        });
        Alert.alert(
          'Sucesso!',
          'Usuário cadastrado com sucesso.',
        );
    } else {
      Alert.alert(
        'Atenção',
        'Por favor, preencha todos os dados corretamente.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Menu')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/seta-esquerda.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.message}>Cadastre Um Cliente(a)</Text>
      </Animatable.View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20}}>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        
        <Text style={styles.title}>Nome:</Text>
        <TextInput 
          placeholder="Digite o nome do cliente..." 
          value={nome}
          onChangeText={text => {
            setNome(text);
            if (text.length > 0 && text.length <= 45) {
              setNomeValid(true);
            } else {
              setNomeValid(false);
            }
          }}
          style={[
            styles.input, 
            nomeValid ? styles.inputValid : styles.inputInvalid
          ]}
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
            if (text.length > 0 && text.includes('@') && text.includes('.com')) {
              setEmailValid(true);
            } else {
              setEmailValid(false);
            }
          }}
          style={[
            styles.input, 
            emailValid ? styles.inputValid : styles.inputInvalid
          ]}
        />

        <Text style={styles.title}>Telefone:</Text>
        <TextInputMask 
          type={'cel-phone'}
          placeholder="Digite o telefone do cliente..." 
          value={telefone}
          onChangeText={text => {
            setTelefone(text);
            if (text.length > 13) {
              setTelefoneValid(true);
            } else {
              setTelefoneValid(false);
            }
          }}
          style={[
            styles.input, 
            telefoneValid ? styles.inputValid : styles.inputInvalid
          ]}
        />

        <Text style={styles.title}>Telefone para emergencias:</Text>
        <TextInputMask 
          type={'cel-phone'}
          placeholder="Digite o telefone de emergencia do cliente..." 
          value={telefone_emergencia}
          onChangeText={text => {
            setTelefone_Emergencia(text);
            if (text.length > 13) {
              setTelefone_EmergenciaValid(true);
            } else {
              setTelefone_EmergenciaValid(false);
            }
          }}
          style={[
            styles.input, 
            telefone_emergenciaValid ? styles.inputValid : styles.inputInvalid
          ]}
        />

        <Text style={styles.title}>Data de Nascimento:</Text>
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          placeholder="DD/MM/YYYY" 
          value={dataNascimento}
          onChangeText={text => {
            setDataNascimento(text);
            if (text.length == 10) {
              setData_NascimentoValid(true);
            } else {
              setData_NascimentoValid(false);
            }
          }}
          style={[
            styles.input, 
           data_nascimentoValid ? styles.inputValid : styles.inputInvalid
          ]}
        />

        <Text style={styles.title}>CPF:</Text>
        <TextInputMask 
          type={'cpf'}
          placeholder="Digite o CPF do cliente..." 
          value={cpf}
          onChangeText={text => {
            setCpf(text);
            if (text.length == 14) {
              setCpfValid(true);
            } else {
              setCpfValid(false);
            }
          }}
          style={[
            styles.input, 
           cpfValid ? styles.inputValid : styles.inputInvalid
          ]}
          
        />

        <Text style={styles.title}>Observações:</Text>
        <TextInput 
          placeholder="Digite as observações do cliente..." 
          value={observacoes}
          multiline={true}
          numberOfLines={3}
          onChangeText={text => {
            setObservacoes(text);
            if (text.length < 90) {
              setObservacoesValid(true);
            } else {
              setObservacoesValid(false);
            }
          }}
          style={[
            styles.input_obs, 
           observacoesValid ? styles.inputValid : styles.inputInvalid
          ]}
          
        />

        <TouchableOpacity title="Cadastrar" onPress={cadastrarCliente} style={styles.button_submit}>
          <Image style={styles.iconimage_submit}
            animation="flipInY"
            source={require('../../assets/seta-direita.png')}
            resizeMode="stretch"
          />
          <Text styles={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </Animatable.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#38a69d",
  },
  containerHeader:{
    marginTop: '1%',
    marginBottom: '3%',
    paddingStart: '1%',
  },
  button:{
    marginTop: 10,
    marginBottom: 34,
    alignItems: "center",
    position: 'absolute',
    left: 16,
  },
  iconimage:{
    width: 35,
    height: 35,
  },
  message:{
    fontSize: 26,
    marginTop: 35,
    marginBottom: 25,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: "center",
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
  inputValid: {
    borderColor: 'green', // Estilo para o campo válido
  },
  inputInvalid: {
    borderColor: 'red', // Estilo para o campo inválido
  },
  button_submit:{
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconimage_submit:{
    width: 35,
    height: 35,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 80,
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
    height: 80,
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
