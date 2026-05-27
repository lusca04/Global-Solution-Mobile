package com.fiap.mobile.global_solution_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sistema_monitorado")
@Data
@NoArgsConstructor
public class SistemaMonitorado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private StatusSistema status;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;

    public enum StatusSistema {
        OPERACIONAL,
        DEGRADADO,
        FALHA,
        DESLIGADO
    }
}
