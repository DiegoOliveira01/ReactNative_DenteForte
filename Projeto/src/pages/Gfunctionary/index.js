import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Alert } from 'react-native';
import * as Animatable from 'react-native-animatable'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListaFuncionariosScreen = () => {
  const [funcionario, setFuncionario] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.110/listar_funcionario.php');
        setFuncionario(response.data);
      } catch (error) {
        console.error(error);
        setFuncionario([]);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (idfuncionario) => {
    navigation.navigate('Afunctionary', { idfuncionario });
  };

  const deleteFunctionary = async (id) => {
    const confirmDelete = Alert.alert(
      'Excluir Funcionário',
      'Você tem certeza que deseja excluir esse funcionário?',
      [
        {
          text: 'Sim',
          onPress: () => {
            try {
              axios.delete(`http://192.168.1.110/deletar_funcionario.php?idfuncionario=${id}`);
              setFuncionario(funcionario.filter(funcionario => funcionario.idfuncionario !== id));
            } catch (error) {
              console.error(error);
            }
          }
        },
        Alert.alert(
            'Funcionário excluido com sucesso!'
        ),
        {
          text: 'Não',
          style: 'cancel'
        }
      ]
    );
  };

  const atualizarFuncionarios = async () => {
    try {
      const response = await axios.get('http://192.168.1.110/listar_funcionario.php');
      setFuncionario(response.data);
      Alert.alert('Funcionários atualizados com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao atualizar Funcionários.');
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filterFuncionarios = () => {
    if (!Array.isArray(funcionario)) return [];
    return funcionario.filter((funcionarios) => {
      const nome = funcionarios.nome.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return nome.includes(searchTermLower);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button_voltar} onPress={ () => navigation.navigate('Menu')}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/seta-esquerda.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button_atualizar} onPress={atualizarFuncionarios}>
                <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/recarregar.png')}
                    resizeMode="stretch"
                />
                <Text styles={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lista de Funcionários</Text>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Funcionário (Nome)"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filterFuncionarios()}
        keyExtractor={item => item.idfuncionario.toString()}
        renderItem={({ item }) => (
          <View style={styles.funcionario}>
            <Text style={styles.dados}>ID Do Cliente: {item.idfuncionario}</Text>
            <Text style={styles.dados}>Nome: {item.nome}</Text>
            <Text style={styles.dados}>Função: {item.funcao}</Text>
            <Text style={styles.dados}>Bairro: {item.bairro}</Text>
            <Text style={styles.dados}>email: {item.email}</Text>
            <Text style={styles.dados}>Telefone: {item.telefone}</Text>
            <Text style={styles.dados}>Data de Nascimento: {item.data_nascimento}</Text>
            <Text style={styles.dados}>CPF: {item.cpf}</Text>
            <Text style={styles.dados}>CRO: {item.cro}</Text>
            <Text style={styles.dados}>Horário: {item.horario}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.idfuncionario)}>
              <Text style={styles.editButtonText}>Editar</Text>
              <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/editing.png')}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteFunctionary(item.idfuncionario)}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
              <Image style={styles.iconimage}
                    animation="flipInY"
                    source={require('../../assets/bin.png')}
                    resizeMode="stretch"
                />
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
  containerForm:{
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '3%',
    paddingEnd: '3%',
},
  button_voltar:{
    marginTop: 10,
    marginBottom: 24,
    alignItems: "center",
    position: 'absolute',
    left: 16,
    
  },
  button_atualizar:{
    marginTop: 10,
    marginBottom: 24,
    alignItems: "center",
    position: 'absolute',
    right: 16,
  },
  iconimage:{
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
  funcionario: {
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

export default ListaFuncionariosScreen;