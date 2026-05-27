package com.fiap.mobile.global_solution_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "evento_operacional")
@Data
@NoArgsConstructor
public class EventoOperacional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private TipoEvento tipo;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "sistema_monitorado_id")
    private SistemaMonitorado sistemaMonitorado;

    public enum TipoEvento {
        INICIALIZACAO,
        MANUTENCAO,
        ANOMALIA,
        FALHA,
        RECUPERACAO,
        ATUALIZACAO
    }
}
