import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const Aconsultation = () => {
  const [consulta, setConsulta] = useState({
    idconsulta: '',
    nome_cliente: '',
    nome_funcionario: '',
    data_consulta: '',
    horario_consulta: ''
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
        if (consultaData.data_consulta) {
          const [day, month, year] = consultaData.data_consulta.split('/');
          setSelectedDate(new Date(year, month - 1, day));
        }
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
      const formattedDate = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`;
      await axios.post('http://192.168.1.110/api_aconsultation.php?action=updateConsulta', {
        ...consulta,
        data_consulta: formattedDate
      });
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
      
      <Text style={styles.label}>Data da Consulta</Text>
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
              handleInputChange('data_consulta', date);
            }
          }}
        />
      )}

      <Text style={styles.label}>Horário da Consulta</Text>
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