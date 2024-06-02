import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const Aconsultation = () => {
  const [consulta, setConsulta] = useState({
    idconsulta: '',
    nome_cliente: '',
    nome_funcionario: '',
    data_consulta: '',
    horario_consulta: ''
  });
  const route = useRoute();
  const navigation = useNavigation();
  const { idconsulta } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultaResponse = await axios.get(`http://192.168.1.110/api_aconsultation.php?action=getConsultaById&idconsulta=${idconsulta}`);
        const consultaData = consultaResponse.data;
        setConsulta({
          idconsulta: consultaData.idconsulta || '',
          nome_cliente: consultaData.nome_cliente || '',
          nome_funcionario: consultaData.nome_funcionario || '',
          data_consulta: consultaData.data_consulta || '',
          horario_consulta: consultaData.horario_consulta || ''
        });
      } catch (error) {
        console.error(error);
        Alert.alert('Erro ao buscar dados.');
      }
    };
    fetchData();
  }, [idconsulta]);

  const handleInputChange = (name, value) => {
    setConsulta({ ...consulta, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.post('http://192.168.1.110/api_aconsultation.php?action=updateConsulta', consulta);
      Alert.alert('Consulta atualizada com sucesso!');
      navigation.navigate('Gconsultation');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar a consulta.');
    }
  };

  const horarios = [
    { label: 'H8:00', value: 'H8:00' },
    { label: 'H9:00', value: 'H9:00' },
    { label: 'H10:00', value: 'H10:00' },
    { label: 'H11:00', value: 'H11:00' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Consulta</Text>
      <Text style={styles.label}>Cliente</Text>
      <Text style={styles.value}>{consulta.nome_cliente}</Text>
      <Text style={styles.label}>Doutor</Text>
      <Text style={styles.value}>{consulta.nome_funcionario}</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da Consulta"
        value={consulta.data_consulta}
        onChangeText={(text) => handleInputChange('data_consulta', text)}
      />
      <RNPickerSelect
        onValueChange={(value) => handleInputChange('horario_consulta', value)}
        items={horarios}
        placeholder={{ label: 'Selecione um horário', value: null }}
        style={pickerSelectStyles}
        value={consulta.horario_consulta}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#38a69d',
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#38a69d',
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    height: 40,
    borderColor: '#38a69d',
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});

export default Aconsultation;