import { TipoSensor } from '../types/sensor';

export interface Sensor {
  id?: number;
  nome: string;
  tipo: TipoSensor;
  unidade: string;
  localizacao: string;
  ativo: boolean;
  dataInstalacao: string;
}
