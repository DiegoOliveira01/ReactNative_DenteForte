import { ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { TextInputMask } from 'react-native-masked-text'

import * as Animatable from 'react-native-animatable'

import { useNavigation, useRoute } from '@react-navigation/native'

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

const funcoes = [
    { label: 'Auxiliar de limpeza', value: 'Auxiliar de limpeza' },
    { label: 'Atendente', value: 'Atendente' },
    { label: 'Dentista', value: 'Dentista' },
    { label: 'Auxilar de dentista', value: 'Auxilar de dentista' },
    { label: 'Anestesista', value: 'Anestesista' },
    { label: 'Dentista chefe', value: 'Dentista chefe' },
];

const horarios = [
    { label: 'Seg-Sex 8H até 14H', value: 'Seg-Sex 8H até 14H' },
    { label: 'Seg-Sex 12H até 18H', value: 'Seg-Sex 12H até 18H' },
    { label: 'Sáb 8H até 14H', value: 'Sáb 8H até 14H' },
    { label: 'Seg-Sex 8H até 14H e Sáb 8H até 14H', value: 'Seg-Sex 8H até 14H e Sáb 8H até 14H' },
    { label: 'Seg-Sex 12H até 18H e Sáb 8H até 14H', value: 'Seg-Sex 12H até 18H e Sáb 8H até 14H' },
];



const EditarFuncionarioScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const idfuncionario = route.params.idfuncionario;
  
  const [nome, setNome] = useState('');
  const [selectedFuncao, setSelectedFuncao] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [cro, setCro] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');

  const [emailValid, setEmailValid] = useState(true);  
  const [nomeValid, setNomeValid] = useState(true); 
  const [telefoneValid, setTelefoneValid] = useState(true); 
  const [data_nascimentoValid, setData_NascimentoValid] = useState(true);
  const [cpfValid, setCpfValid] = useState(true);
  const [croValid, setCroValid] = useState(true);


 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.110/editar_funcionario.php?idfuncionario=${idfuncionario}`);
      const funcionario = response.data;

      setNome(funcionario.nome);
      setSelectedFuncao(funcionario.funcao);
      setSelectedBairro(funcionario.bairro);
      setEmail(funcionario.email);
      setTelefone(funcionario.telefone);
      setDataNascimento(funcionario.data_nascimento);
      setCpf(funcionario.cpf);
      setCro(funcionario.cro);
      setSelectedHorario(funcionario.horario);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [idfuncionario]);

  const updateFunctionary = async () => {
    if (emailValid && nomeValid && telefoneValid && data_nascimentoValid && cpfValid && croValid) {
      const response = await axios.put(`http://192.168.1.110/atualizar_funcionario.php?idfuncionario=${route.params.idfuncionario}`, {
        nome,
        selectedFuncao,
        selectedBairro,
        email,
        telefone,
        dataNascimento,
        cpf,
        cro,
        selectedHorario,
        
      });
      try{
        console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
    Alert.alert(
      'Sucesso!',
      'Usuário atualizado com sucesso.',
    );
    navigation.navigate('Gfunctionary')
  }
  else{
    Alert.alert(
      'Atenção',
      'Por favor, preencha todos os dados corretamente',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    )
  }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Gfunctionary')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/seta-esquerda.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.message}>Atualize Um Funcionário(a)</Text>
      </Animatable.View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20}}>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
     
      <Text style={styles.title}>Nome:</Text>
        <TextInput 
          placeholder="Digite o nome do funcionário..." 
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

        <Text style={styles.title}>Função:</Text>
        <RNPickerSelect
          placeholder={{ label: selectedFuncao ? selectedFuncao : 'Selecione uma função', value: selectedFuncao }}
          onValueChange={(value) => setSelectedFuncao(value)}
          items={funcoes}
          style={pickerSelectStyles}
        />

        <Text style={styles.title}>Bairro:</Text>
        <RNPickerSelect
          placeholder={{ label: selectedBairro ? selectedBairro : 'Selecione um bairro', value: selectedBairro }}
          onValueChange={(value) => setSelectedBairro(value)}
          items={bairros}
          style={pickerSelectStyles}
        />

        <Text style={styles.title}>Email:</Text>
        <TextInput 
          placeholder="Digite o bairro do funcionário..." 
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
          placeholder="Digite o telefone do funcionário..." 
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
          placeholder="Digite o CPF do Funcionário..." 
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

        <Text style={styles.title}>CRO:</Text>
        <TextInput
          placeholder="Digite o CRO (Registro de Dentista)" 
          value={cro}
          onChangeText={text => {
            setCro(text);
            if (text.length == 0 || text.length > 5) {
              setCroValid(true);
            } else {
              setCroValid(false);
            }
          }}
          style={[
            styles.input, 
           croValid ? styles.inputValid : styles.inputInvalid
          ]}
          
        />

        <Text style={styles.title}>Horário de trabalho:</Text>
        <RNPickerSelect
          placeholder={{ label: selectedHorario ? selectedHorario : 'Selecione um horário', value: selectedHorario }}
          onValueChange={(value) => setSelectedHorario(value)}
          items={horarios}
          style={pickerSelectStyles}
        />

        <TouchableOpacity title="Cadastrar" onPress={updateFunctionary} style={styles.button_submit}>
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
    marginBottom: 24,
    marginRight: "90%",
  },
  iconimage:{
    width: 35,
    height: 35,
  },
  message:{
    fontSize: 28,
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
export default EditarFuncionarioScreen;