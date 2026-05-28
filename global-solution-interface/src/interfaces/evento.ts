import { TipoEvento } from '../types/evento';
import { SistemaMonitorado } from '../interfaces/modulo';

export interface EventoOperacional {
  id?: number;
  descricao: string;
  tipo: TipoEvento;
  dataHora: string;
  sistemaMonitorado?: SistemaMonitorado;
}