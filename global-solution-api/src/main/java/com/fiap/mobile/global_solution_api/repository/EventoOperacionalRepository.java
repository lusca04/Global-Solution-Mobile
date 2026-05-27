package com.fiap.mobile.global_solution_api.repository;

import com.fiap.mobile.global_solution_api.model.EventoOperacional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoOperacionalRepository extends JpaRepository<EventoOperacional, Long> {

    List<EventoOperacional> findByTipo(EventoOperacional.TipoEvento tipo);
}
