package com.fiap.mobile.global_solution_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "sensor")
@Data
@NoArgsConstructor
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Enumerated(EnumType.STRING)
    private TipoSensor tipo;

    private String unidade;

    private String localizacao;

    private boolean ativo;

    private LocalDate dataInstalacao;

    public enum TipoSensor {
        TEMPERATURA,
        PRESSAO,
        RADIACAO,
        OXIGENIO,
        VELOCIDADE,
        COMBUSTIVEL,
        ELETRICO,
        COMPUTACIONAL
    }
}
