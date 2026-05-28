import { TipoSensor } from '../types/sensor';
import { Sensor } from '../interfaces/sensor';
import { apiClient } from '../api';

export const sensoresAPI = {
  
  listarTodos: () => apiClient.get<Sensor[]>('/sensores'),
  
  buscarPorId: (id: number) => apiClient.get<Sensor>(`/sensores/${id}`),
  
  listarAtivos: () => apiClient.get<Sensor[]>('/sensores/ativos'),
  
  listarPorTipo: (tipo: TipoSensor) => apiClient.get<Sensor[]>(`/sensores/tipo/${tipo}`),
  
  criar: (sensor: Sensor) => apiClient.post<Sensor>('/sensores', sensor),
  
  atualizar: (id: number, sensor: Sensor) => apiClient.put<Sensor>(`/sensores/${id}`, sensor),
  
  deletar: (id: number) => apiClient.delete(`/sensores/${id}`),
};

export default sensoresAPI;