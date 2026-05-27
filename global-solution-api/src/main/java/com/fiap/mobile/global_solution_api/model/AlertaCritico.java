package com.fiap.mobile.global_solution_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerta_critico")
@Data
@NoArgsConstructor
public class AlertaCritico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mensagem;

    @Enumerated(EnumType.STRING)
    private NivelAlerta nivel;

    private boolean resolvido;

    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "evento_operacional_id")
    private EventoOperacional eventoOperacional;

    public enum NivelAlerta {
        BAIXO,
        MEDIO,
        ALTO,
        CRITICO
    }
}
