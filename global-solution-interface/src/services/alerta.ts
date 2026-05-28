import { NivelAlerta } from '../types/alerta';
import { AlertaCritico } from '../interfaces/alerta';
import { apiClient } from '../api';

export const alertasAPI = 
{
  listarTodos: () => apiClient.get<AlertaCritico[]>('/alertas'),
  
  buscarPorId: (id: number) => apiClient.get<AlertaCritico>(`/alertas/${id}`),
  
  listarNaoResolvidos: () => apiClient.get<AlertaCritico[]>('/alertas/nao-resolvidos'),
  
  listarPorNivel: (nivel: NivelAlerta) => apiClient.get<AlertaCritico[]>(`/alertas/nivel/${nivel}`),
  
  criar: (alerta: AlertaCritico) => apiClient.post<AlertaCritico>('/alertas', alerta),
  
  atualizar: (id: number, alerta: AlertaCritico) => apiClient.put<AlertaCritico>(`/alertas/${id}`, alerta),
  
  resolver: (id: number) => apiClient.patch<AlertaCritico>(`/alertas/${id}/resolver`),
  
  deletar: (id: number) => apiClient.delete(`/alertas/${id}`),
};

export default alertasAPI;