package com.fiap.mobile.global_solution_api.repository;

import com.fiap.mobile.global_solution_api.model.SistemaMonitorado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SistemaMonitoradoRepository extends JpaRepository<SistemaMonitorado, Long> {

    List<SistemaMonitorado> findByStatus(SistemaMonitorado.StatusSistema status);
}
