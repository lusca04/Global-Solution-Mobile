import { NivelAlerta } from '../types/alerta';
import { EventoOperacional } from '../interfaces/evento';

export interface AlertaCritico {
  id?: number;
  mensagem: string;
  nivel: NivelAlerta;
  resolvido: boolean;
  dataHora: string;
  eventoOperacional?: EventoOperacional;
}
