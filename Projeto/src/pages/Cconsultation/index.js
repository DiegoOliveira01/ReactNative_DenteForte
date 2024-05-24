import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');

  const horarios = [
    { label: 'H8:00', value: '08:00:00' },
    { label: 'H9:00', value: '09:00:00' },
    { label: 'H10:00', value: '10:00:00' },
    { label: 'H11:00', value: '11:00:00' }
  ];

  useEffect(() => {
    axios.get('http://192.168.1.110/api.php?action=getClientes')
      .then(response => setClientes(response.data.map(cliente => ({
        label: cliente.nome,
        value: cliente.idcliente
      }))))
      .catch(error => console.error(error));
    
    axios.get('http://192.168.1.110/api.php?action=getFuncionarios')
      .then(response => setFuncionarios(response.data.map(funcionario => ({
        label: funcionario.nome,
        value: funcionario.idfuncionario
      }))))
      .catch(error => console.error(error));
  }, []);

  const marcarConsulta = () => {
    if (!selectedCliente || !selectedFuncionario || !selectedHorario) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const dataConsulta = `2024-05-21 ${selectedHorario}`; // Ajuste a data conforme necessário

    const formData = new FormData();
    formData.append('idcliente', selectedCliente);
    formData.append('idfuncionario', selectedFuncionario);
    formData.append('data_consulta', dataConsulta);

    console.log("Enviando dados:", {
      idcliente: selectedCliente,
      idfuncionario: selectedFuncionario,
      data_consulta: dataConsulta
    });

    axios.post('http://192.168.1.110/api.php?action=marcarConsulta', formData)
    .then(response => Alert.alert('Sucesso', response.data.message))
    .catch(error => {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível marcar a consulta.');
    });
  };

  return (
    <View style={styles.container}>
      <Text>Selecione o Cliente:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecione um cliente', value: '' }}
        onValueChange={(value) => setSelectedCliente(value)}
        items={clientes}
        style={pickerSelectStyles}
      />

      <Text>Selecione o Funcionário:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecione um funcionário', value: '' }}
        onValueChange={(value) => setSelectedFuncionario(value)}
        items={funcionarios}
        style={pickerSelectStyles}
      />

      <Text>Selecione o Horário:</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecione um horário', value: '' }}
        onValueChange={(value) => setSelectedHorario(value)}
        items={horarios}
        style={pickerSelectStyles}
      />

      <Button title="Marcar Consulta" onPress={marcarConsulta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
});

export default App;