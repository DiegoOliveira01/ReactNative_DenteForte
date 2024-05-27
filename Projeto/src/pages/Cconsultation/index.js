import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const CadastrarConsultaScreen = () => {
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const horarios = [
    { label: 'H8:00', value: 'H8:00' },
    { label: 'H9:00', value: 'H9:00' },
    { label: 'H10:00', value: 'H10:00' },
    { label: 'H11:00', value: 'H11:00' }
  ];

  useEffect(() => {
    axios.get('http://192.168.1.110/api_cconsulta.php?action=getClientes')
      .then(response => setClientes(response.data.map(cliente => ({
        label: cliente.nome,
        value: cliente.idcliente
      }))))
      .catch(error => console.error(error));
    
    axios.get('http://192.168.1.110/api_cconsulta.php?action=getFuncionarios')
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
  
    const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
  
    const data = {
      idcliente: selectedCliente,
      idfuncionario: selectedFuncionario,
      data_consulta: formattedDate,
      horario_consulta: selectedHorario
    };
  
    axios.post('http://192.168.1.110/api_cconsulta.php?action=marcarConsulta', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => Alert.alert('Aviso', response.data.message))
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

      <Text>Selecione a Data:</Text>
      <Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

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

export default CadastrarConsultaScreen;