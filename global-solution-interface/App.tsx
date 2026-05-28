import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './src/styles/style';
import { useState, useEffect } from 'react';
import { SistemaMonitorado } from './src/interfaces/modulo';
import { Sensor } from './src/interfaces/sensor';
import { AlertaCritico } from './src/interfaces/alerta';
import { EventoOperacional } from './src/interfaces/evento';
import { StatusSistema } from './src/types/modulo';
import { TipoSensor } from './src/types/sensor';
import { NivelAlerta } from './src/types/alerta';
import { TipoEvento } from './src/types/evento';
import { sistemasAPI, sensoresAPI, alertasAPI, eventosAPI } from './src/services';

type Screen = 'home' | 'sistemas' | 'sensores' | 'alertas' | 'eventos';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [sistemas, setSistemas] = useState<SistemaMonitorado[]>([]);
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [alertas, setAlertas] = useState<AlertaCritico[]>([]);
  const [eventos, setEventos] = useState<EventoOperacional[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalCriarVisible, setModalCriarVisible] = useState(false);
  const [modalType, setModalType] = useState<'sistema' | 'sensor' | 'evento' | 'alerta' | null>(null);

  const [formSistema, setFormSistema] = useState({ nome: '', descricao: '', status: StatusSistema.OPERACIONAL });
  const [formSensor, setFormSensor] = useState({ nome: '', tipo: TipoSensor.TEMPERATURA, unidade: '', localizacao: '', ativo: true, dataInstalacao: new Date().toISOString().split('T')[0] });
  const [formEvento, setFormEvento] = useState({ descricao: '', tipo: TipoEvento.INICIALIZACAO });
  const [formAlerta, setFormAlerta] = useState({ mensagem: '', nivel: NivelAlerta.MEDIO, resolvido: false });

  useEffect(() => {
    loadData();
  }, [screen]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (screen === 'sistemas') {
        const data = await sistemasAPI.listarTodos();
        setSistemas(data);
      } else if (screen === 'sensores') {
        const data = await sensoresAPI.listarTodos();
        setSensores(data);
      } else if (screen === 'alertas') {
        const data = await alertasAPI.listarTodos();
        setAlertas(data);
      } else if (screen === 'eventos') {
        const data = await eventosAPI.listarTodos();
        setEventos(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar dados: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarSistema = async () => {
    if (!formSistema.nome.trim() || !formSistema.descricao.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      console.log('Enviando sistema:', formSistema);
      await sistemasAPI.criar(formSistema);
      Alert.alert('Sucesso', 'Sistema criado!');
      setModalCriarVisible(false);
      setFormSistema({ nome: '', descricao: '', status: StatusSistema.OPERACIONAL });
      loadData();
    } catch (error) {
      console.error('Erro ao criar sistema:', error);
      Alert.alert('Erro', 'Falha ao criar sistema: ' + (error as Error).message);
    }
  };

  const handleCriarSensor = async () => {
    if (!formSensor.nome.trim() || !formSensor.unidade.trim() || !formSensor.localizacao.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      console.log('Enviando sensor:', formSensor);
      await sensoresAPI.criar(formSensor);
      Alert.alert('Sucesso', 'Sensor criado!');
      setModalCriarVisible(false);
      setFormSensor({ nome: '', tipo: TipoSensor.TEMPERATURA, unidade: '', localizacao: '', ativo: true, dataInstalacao: new Date().toISOString().split('T')[0] });
      loadData();
    } catch (error) {
      console.error('Erro ao criar sensor:', error);
      Alert.alert('Erro', 'Falha ao criar sensor: ' + (error as Error).message);
    }
  };

  const handleCriarEvento = async () => {
    if (!formEvento.descricao.trim()) {
      Alert.alert('Erro', 'Preencha a descrição');
      return;
    }
    try {
      const evento = {
        descricao: formEvento.descricao,
        tipo: formEvento.tipo,
        dataHora: new Date().toISOString(),
      };
      console.log('Enviando evento:', evento);
      await eventosAPI.criar(evento as EventoOperacional);
      Alert.alert('Sucesso', 'Evento criado!');
      setModalCriarVisible(false);
      setFormEvento({ descricao: '', tipo: TipoEvento.INICIALIZACAO });
      loadData();
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      Alert.alert('Erro', 'Falha ao criar evento: ' + (error as Error).message);
    }
  };

  const handleCriarAlerta = async () => {
    if (!formAlerta.mensagem.trim()) {
      Alert.alert('Erro', 'Preencha a mensagem');
      return;
    }
    try {
      const alerta = {
        mensagem: formAlerta.mensagem,
        nivel: formAlerta.nivel,
        dataHora: new Date().toISOString(),
        resolvido: false,
      };
      console.log('Enviando alerta:', alerta);
      await alertasAPI.criar(alerta as AlertaCritico);
      Alert.alert('Sucesso', 'Alerta criado!');
      setModalCriarVisible(false);
      setFormAlerta({ mensagem: '', nivel: NivelAlerta.MEDIO, resolvido: false });
      loadData();
    } catch (error) {
      console.error('Erro ao criar alerta:', error);
      Alert.alert('Erro', 'Falha ao criar alerta: ' + (error as Error).message);
    }
  };

  const handleResolverAlerta = async (id: number | undefined) => {
    if (!id) return;
    try {
      await alertasAPI.resolver(id);
      loadData();
      Alert.alert('Sucesso', 'Alerta resolvido!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao resolver alerta');
    }
  };

  const handleDeletarSistema = async (id: number | undefined) => {
    if (!id) return;
    try {
      await sistemasAPI.deletar(id);
      loadData();
      Alert.alert('Sucesso', 'Sistema deletado!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao deletar sistema');
    }
  };

  const renderHome = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Space Dashboard</Text>
      <Text style={styles.subtitle}>Sistema de Monitoramento</Text>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setScreen('sistemas')}
      >
        <Text style={styles.menuButtonText}>📊 Sistemas Monitorados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setScreen('sensores')}
      >
        <Text style={styles.menuButtonText}>🔍 Sensores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setScreen('alertas')}
      >
        <Text style={styles.menuButtonText}>⚠️ Alertas Críticos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setScreen('eventos')}
      >
        <Text style={styles.menuButtonText}>📋 Eventos Operacionais</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );

  const renderModal = () => {
    if (modalType === 'sistema') {
      return (
        <Modal visible={modalCriarVisible} animationType="slide">
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalCriarVisible(false)}>
                <Text style={styles.closeButton}>← Fechar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Criar Sistema</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do sistema"
                value={formSistema.nome}
                onChangeText={(text) => setFormSistema({ ...formSistema, nome: text })}
              />
              <Text style={styles.label}>Descrição:</Text>
              <TextInput
                style={styles.input}
                placeholder="Descrição do sistema"
                value={formSistema.descricao}
                onChangeText={(text) => setFormSistema({ ...formSistema, descricao: text })}
                multiline
              />
              <Text style={styles.label}>Status:</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={formSistema.status}
                  onValueChange={(value) => setFormSistema({ ...formSistema, status: value })}
                >
                  {Object.values(StatusSistema).map((status) => (
                    <Picker.Item key={status} label={status} value={status} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleCriarSistema}>
                <Text style={styles.submitButtonText}>Criar Sistema</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      );
    }

    if (modalType === 'sensor') {
      return (
        <Modal visible={modalCriarVisible} animationType="slide">
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalCriarVisible(false)}>
                <Text style={styles.closeButton}>← Fechar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Criar Sensor</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do sensor"
                value={formSensor.nome}
                onChangeText={(text) => setFormSensor({ ...formSensor, nome: text })}
              />
              <Text style={styles.label}>Tipo:</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={formSensor.tipo}
                  onValueChange={(value) => setFormSensor({ ...formSensor, tipo: value })}
                >
                  {Object.values(TipoSensor).map((tipo) => (
                    <Picker.Item key={tipo} label={tipo} value={tipo} />
                  ))}
                </Picker>
              </View>
              <Text style={styles.label}>Unidade:</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: °C, Pa, RPM"
                value={formSensor.unidade}
                onChangeText={(text) => setFormSensor({ ...formSensor, unidade: text })}
              />
              <Text style={styles.label}>Localização:</Text>
              <TextInput
                style={styles.input}
                placeholder="Localização do sensor"
                value={formSensor.localizacao}
                onChangeText={(text) => setFormSensor({ ...formSensor, localizacao: text })}
              />
              <Text style={styles.label}>Ativo:</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={formSensor.ativo ? 'true' : 'false'}
                  onValueChange={(value) => setFormSensor({ ...formSensor, ativo: value === 'true' })}
                >
                  <Picker.Item label="Sim" value="true" />
                  <Picker.Item label="Não" value="false" />
                </Picker>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleCriarSensor}>
                <Text style={styles.submitButtonText}>Criar Sensor</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      );
    }

    if (modalType === 'evento') {
      return (
        <Modal visible={modalCriarVisible} animationType="slide">
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalCriarVisible(false)}>
                <Text style={styles.closeButton}>← Fechar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Criar Evento</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Descrição:</Text>
              <TextInput
                style={styles.input}
                placeholder="Descrição do evento"
                value={formEvento.descricao}
                onChangeText={(text) => setFormEvento({ ...formEvento, descricao: text })}
                multiline
              />
              <Text style={styles.label}>Tipo:</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={formEvento.tipo}
                  onValueChange={(value) => setFormEvento({ ...formEvento, tipo: value })}
                >
                  {Object.values(TipoEvento).map((tipo) => (
                    <Picker.Item key={tipo} label={tipo} value={tipo} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleCriarEvento}>
                <Text style={styles.submitButtonText}>Criar Evento</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      );
    }

    if (modalType === 'alerta') {
      return (
        <Modal visible={modalCriarVisible} animationType="slide">
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalCriarVisible(false)}>
                <Text style={styles.closeButton}>← Fechar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Criar Alerta</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Mensagem:</Text>
              <TextInput
                style={styles.input}
                placeholder="Mensagem do alerta"
                value={formAlerta.mensagem}
                onChangeText={(text) => setFormAlerta({ ...formAlerta, mensagem: text })}
                multiline
              />
              <Text style={styles.label}>Nível:</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={formAlerta.nivel}
                  onValueChange={(value) => setFormAlerta({ ...formAlerta, nivel: value })}
                >
                  {Object.values(NivelAlerta).map((nivel) => (
                    <Picker.Item key={nivel} label={nivel} value={nivel} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity style={styles.submitButton} onPress={handleCriarAlerta}>
                <Text style={styles.submitButtonText}>Criar Alerta</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      );
    }

    return null;
  };

  const renderSistemas = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Sistemas Monitorados</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalType('sistema');
            setModalCriarVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      ) : (
        <FlatList
          data={sistemas}
          keyExtractor={(item) => item.id?.toString() || '0'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardText}>Descrição: {item.descricao}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === StatusSistema.OPERACIONAL
                        ? '#00aa00'
                        : item.status === StatusSistema.DEGRADADO
                          ? '#ff8800'
                          : item.status === StatusSistema.FALHA
                            ? '#ff0000'
                            : '#888888',
                  },
                ]}
              >
                Status: {item.status}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletarSistema(item.id)}
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );

  const renderSensores = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Sensores</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalType('sensor');
            setModalCriarVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item) => item.id?.toString() || '0'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardText}>Tipo: {item.tipo}</Text>
              <Text style={styles.cardText}>Unidade: {item.unidade}</Text>
              <Text style={styles.cardText}>Localização: {item.localizacao}</Text>
              <Text style={styles.cardText}>
                Status: {item.ativo ? '✅ Ativo' : '❌ Inativo'}
              </Text>
              <Text style={styles.cardText}>
                Instalado em: {new Date(item.dataInstalacao).toLocaleDateString()}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );

  const renderAlertas = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Alertas Críticos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalType('alerta');
            setModalCriarVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id?.toString() || '0'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.mensagem}</Text>
              <Text
                style={[
                  styles.cardText,
                  {
                    color:
                      item.nivel === NivelAlerta.CRITICO
                        ? '#ff0000'
                        : item.nivel === NivelAlerta.ALTO
                          ? '#ff6600'
                          : item.nivel === NivelAlerta.MEDIO
                            ? '#ff9900'
                            : '#0066cc',
                  },
                ]}
              >
                Nível: {item.nivel}
              </Text>
              <Text style={styles.cardText}>
                Data: {new Date(item.dataHora).toLocaleString()}
              </Text>
              <Text style={styles.cardText}>
                Status: {item.resolvido ? '✅ Resolvido' : '⏳ Pendente'}
              </Text>
              {!item.resolvido && (
                <TouchableOpacity
                  style={styles.resolveButton}
                  onPress={() => handleResolverAlerta(item.id)}
                >
                  <Text style={styles.resolveButtonText}>Marcar como Resolvido</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );

  const renderEventos = () => (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('home')}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Eventos Operacionais</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalType('evento');
            setModalCriarVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id?.toString() || '0'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.descricao}</Text>
              <Text style={styles.cardText}>Tipo: {item.tipo}</Text>
              <Text style={styles.cardText}>
                Data: {new Date(item.dataHora).toLocaleString()}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.root}>
      {screen === 'home' && renderHome()}
      {screen === 'sistemas' && renderSistemas()}
      {screen === 'sensores' && renderSensores()}
      {screen === 'alertas' && renderAlertas()}
      {screen === 'eventos' && renderEventos()}
      {renderModal()}
    </ScrollView>
  );
}
