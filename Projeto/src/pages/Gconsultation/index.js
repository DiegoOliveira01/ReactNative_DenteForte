import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListaConsultasScreen = () => {
  const [consultas, setConsultas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.110/api_gconsultation.php?action=getConsultas');
        setConsultas(response.data);
      } catch (error) {
        console.error(error);
        setConsultas([]);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (idconsulta) => {
    navigation.navigate('Aconsultation', { idconsulta });
  };

  const deleteConsulta = async (id) => {
    Alert.alert(
      'Excluir Consulta',
      'Você tem certeza que deseja excluir essa consulta?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.1.110/api_gconsultation.php?action=deleteConsulta&idconsulta=${id}`);
              setConsultas(consultas.filter(consulta => consulta.idconsulta !== id));
              Alert.alert('Consulta excluída com sucesso!');
            } catch (error) {
              console.error(error);
              Alert.alert('Erro ao excluir a consulta.');
            }
          }
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ]
    );
  };

  const atualizarConsultas = async () => {
    try {
      const response = await axios.get('http://192.168.1.110/api_gconsultation.php?action=getConsultas');
      setConsultas(response.data);
      Alert.alert('Consultas atualizadas com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar Consultas.');
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filterConsultas = () => {
    if (!Array.isArray(consultas)) return [];
    return consultas.filter((consulta) => {
      const nomeCliente = consulta.nome_cliente.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return nomeCliente.includes(searchTermLower);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button_voltar} onPress={() => navigation.navigate('Menu')}>
        <Image style={styles.iconimage} source={require('../../assets/seta-esquerda.png')} resizeMode="stretch" />
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_atualizar} onPress={atualizarConsultas}>
        <Image style={styles.iconimage} source={require('../../assets/recarregar.png')} resizeMode="stretch" />
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lista de Consultas</Text>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Consulta (Nome do Cliente)"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filterConsultas()}
          keyExtractor={item => item.idconsulta.toString()}
          renderItem={({ item }) => (
            <View style={styles.consulta}>
              <Text style={styles.dados}>ID da Consulta: {item.idconsulta}</Text>
              <Text style={styles.dados}>Cliente: {item.nome_cliente}</Text>
              <Text style={styles.dados}>Funcionário: {item.nome_funcionario}</Text>
              <Text style={styles.dados}>Data: {item.data_consulta}</Text>
              <Text style={styles.dados}>Horário: {item.horario_consulta}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.idconsulta)}>
                <Text style={styles.editButtonText}>Editar</Text>
                <Image style={styles.iconimage} source={require('../../assets/editing.png')} resizeMode="stretch" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteConsulta(item.idconsulta)}>
                <Text style={styles.deleteButtonText}>Excluir</Text>
                <Image style={styles.iconimage} source={require('../../assets/bin.png')} resizeMode="stretch" />
              </TouchableOpacity>
            </View>
          )}
        />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
    padding: 16,
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '3%',
    paddingEnd: '3%',
  },
  button_voltar: {
    marginTop: 10,
    marginBottom: 24,
    alignItems: "center",
    position: 'absolute',
    left: 16,
  },
  button_atualizar: {
    marginTop: 10,
    marginBottom: 24,
    alignItems: "center",
    position: 'absolute',
    right: 16,
  },
  iconimage: {
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 45,
    alignSelf: "center",
  },
  consulta: {
    borderStyle: "solid",
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#38a69d',
    borderRadius: 4,
    marginBottom: 10,
  },
  dados: {
    fontSize: 16,
    marginBottom: "0.2%",
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    marginTop: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#38a69d',
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    marginTop: 16,
  },
});

export default ListaConsultasScreen;