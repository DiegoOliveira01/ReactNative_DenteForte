import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListaClientesScreen = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      setClientes(clientes.filter(cliente => cliente.idcliente!== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredClientes = clientes.filter(cliente => {
    const nome = cliente.email.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return nome.includes(searchTermLower);
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Menu')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/seta-esquerda.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
      <Text style={styles.title}>Lista de Clientes</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cliente (Email)"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredClientes}
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
  iconimage:{
    width: 35,
    height: 35,
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});

export default ListaClientesScreen;