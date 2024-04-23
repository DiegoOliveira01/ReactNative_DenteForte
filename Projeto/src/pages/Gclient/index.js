import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListaClientesScreen = () => {
  const [clientes, setClientes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/listar_cliente.php');
        setClientes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (idcliente) => {
    navigation.navigate('Aclient', { idcliente });
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost/deletar_cliente.php?idcliente=${id}`);
      setClientes(clientes.filter(cliente => cliente.idcliente !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={item => item.idcliente.toString()}
        renderItem={({ item }) => (
          <View style={styles.cliente}>
            <Text style={styles.email}>Nome: {item.email}</Text>
            <Text style={styles.email}>Senha: {item.senha}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.idcliente)}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteClient(item.idcliente)}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cliente: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  email: {
    fontSize: 16,
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
});

export default ListaClientesScreen;