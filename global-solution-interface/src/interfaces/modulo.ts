import { Sensor } from '../interfaces/sensor';
import { StatusSistema } from '../types/modulo';

export interface SistemaMonitorado {
  id?: number;
  nome: string;
  descricao: string;
  status: StatusSistema;
  sensor?: Sensor;
}