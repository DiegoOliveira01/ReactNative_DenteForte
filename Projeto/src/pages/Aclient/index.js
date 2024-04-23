import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const EditarClienteScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost/editar_cliente.php?idcliente=${route.params.idcliente}`);
        setEmail(response.data.email);
        setSenha(response.data.senha);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const updateClient = async () => {
    try {
      await axios.put(`http://localhost/atualizar_cliente.php?idcliente=${route.params.idcliente}`, {
        email,
        senha,
      });
      // Redirecione para a tela de lista de clientes após atualizar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={text => setSenha(text)}
        placeholder="Senha"
      />
      <TouchableOpacity style={styles.updateButton} onPress={updateClient}>
        <Text style={styles.updateButtonText}>Atualizar</Text>
      </TouchableOpacity>
    </ScrollView>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditarClienteScreen;