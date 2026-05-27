package com.fiap.mobile.global_solution_api.repository;

import com.fiap.mobile.global_solution_api.model.AlertaCritico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertaCriticoRepository extends JpaRepository<AlertaCritico, Long> {

    List<AlertaCritico> findByNivel(AlertaCritico.NivelAlerta nivel);

    List<AlertaCritico> findByResolvido(boolean resolvido);
}
