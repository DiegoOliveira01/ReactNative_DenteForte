import { ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, Button } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

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



const EditarClienteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const idcliente = route.params.idcliente;
  
  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [telefone_emergencia, setTelefone_Emergencia] = useState('');
  const [data_nascimento, setData_Nascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [observacoes, setObservacoes] = useState('');

  
  
  
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  const handleEmailChange = (text) => {
    setEmail(text);
    validateEmail();
  };

  if (!route ||!route.params) {
    console.error('Route params are undefined');
    return null;
  }

  const validarData = (text) => {
    if (text.length > 10) {
      return;
    }
  
    let newText = text;
    if (newText.length === 2 || newText.length === 5) {
      newText += '/';
    }
    setData_Nascimento(newText);
  
    const regex = /^([0-3][0-9])\/([0-1][0-9])\/([0-9]{4})$/;
    if (regex.test(newText)) {
      const [day, month, year] = newText.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      if (date && date.getMonth() + 1 === month && date.getDate() === day) {
        console.log("Data válida");
      } else {
        console.log("Data inválida");
      }
    }
  }
 // http://localhost/editar_cliente.php?idcliente=
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.110/editar_cliente.php?idcliente=${idcliente}`);
      const client = response.data;

      setNome(client.nome);
      setSelectedBairro(client.bairro);
      setEmail(client.email);
      setTelefone(client.telefone);
      setTelefone_Emergencia(client.telefone_emergencia);
      setData_Nascimento(client.data_nascimento);
      setCpf(client.cpf);
      setObservacoes(client.observacoes);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [idcliente]);

  const updateClient = async () => {
    if (emailValid) {
      const response = await axios.put(`http://192.168.1.110/atualizar_cliente.php?idcliente=${route.params.idcliente}`, {
        nome,
        selectedBairro,
        email,
        telefone,
        telefone_emergencia,
        data_nascimento,
        cpf,
        observacoes,
      });
     
      try{
        console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }
  else{
    alert("O e-mail inserido é inválido!");
  }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Gclient')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/seta-esquerda.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.message}>Atualize Um Cliente(a)</Text>
      </Animatable.View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20}}>
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
          placeholder={{ label: selectedBairro ? selectedBairro : 'Selecione um bairro', value: selectedBairro }}
          onValueChange={(value) => setSelectedBairro(value)}
          items={bairros}
          style={pickerSelectStyles}
        />

        <Text style={styles.title}>Email:</Text>
        <TextInput 
          placeholder="Digite o bairro do cliente..." 
          value={email}
          onChangeText={handleEmailChange}
          style={styles.input}
        />

        <Text style={styles.title}>Telefone:</Text>
        <TextInput 
          placeholder="Digite o telefone do cliente..." 
          value={telefone}
          onChangeText={text => setTelefone(text)}
          style={styles.input}
        />

        <Text style={styles.title}>Telefone para emergencias:</Text>
        <TextInput 
          placeholder="Digite o telefone de emergencia do cliente..." 
          value={telefone_emergencia}
          onChangeText={text => setTelefone_Emergencia(text)}
          style={styles.input}
        />

        <Text style={styles.title}>Data de Nascimento:</Text>
        <TextInput 
          placeholder="DD/MM/YYYY" 
          value={data_nascimento}
          onChangeText={validarData} // Chamando a função para validar a entrada
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
          multiline={true}
          numberOfLines={3}
        />

        <TouchableOpacity title="Cadastrar" onPress={updateClient} style={styles.button_submit}>
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
export default EditarClienteScreen;