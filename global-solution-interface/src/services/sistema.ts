import { StatusSistema } from '../types/modulo';
import { SistemaMonitorado } from '../interfaces/modulo';
import { apiClient } from '../api';

export const sistemasAPI = {
  listarTodos: () => apiClient.get<SistemaMonitorado[]>('/sistemas'),
  
  buscarPorId: (id: number) => apiClient.get<SistemaMonitorado>(`/sistemas/${id}`),
  
  listarPorStatus: (status: StatusSistema) => apiClient.get<SistemaMonitorado[]>(`/sistemas/status/${status}`),
  
  criar: (sistema: SistemaMonitorado) => apiClient.post<SistemaMonitorado>('/sistemas', sistema),
  
  atualizar: (id: number, sistema: SistemaMonitorado) => apiClient.put<SistemaMonitorado>(`/sistemas/${id}`, sistema),
  
  deletar: (id: number) => apiClient.delete(`/sistemas/${id}`),
};

export default sistemasAPI;