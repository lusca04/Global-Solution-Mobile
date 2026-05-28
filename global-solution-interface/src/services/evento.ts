import { TipoEvento } from '../types/evento';
import { EventoOperacional } from '../interfaces/evento';
import { apiClient } from '../api';

export const eventosAPI = 
{
  listarTodos: () => apiClient.get<EventoOperacional[]>('/eventos'),
  
  buscarPorId: (id: number) => apiClient.get<EventoOperacional>(`/eventos/${id}`),
  
  listarPorTipo: (tipo: TipoEvento) => apiClient.get<EventoOperacional[]>(`/eventos/tipo/${tipo}`),
  
  criar: (evento: EventoOperacional) => apiClient.post<EventoOperacional>('/eventos', evento),
  
  atualizar: (id: number, evento: EventoOperacional) => apiClient.put<EventoOperacional>(`/eventos/${id}`, evento),
  
  deletar: (id: number) => apiClient.delete(`/eventos/${id}`),
};

export default eventosAPI;