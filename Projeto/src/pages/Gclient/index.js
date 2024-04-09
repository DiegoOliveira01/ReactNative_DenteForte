import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ListaClientesScreen = () => {
  const [clientes, setClientes] = useState([]);

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
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteClient(item.idcliente)}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
            <Text style={styles.email}>Senha: {item.senha}</Text>
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
});

export default ListaClientesScreen;