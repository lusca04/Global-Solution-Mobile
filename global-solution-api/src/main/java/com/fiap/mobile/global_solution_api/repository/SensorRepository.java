package com.fiap.mobile.global_solution_api.repository;

import com.fiap.mobile.global_solution_api.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {

    List<Sensor> findByAtivo(boolean ativo);

    List<Sensor> findByTipo(Sensor.TipoSensor tipo);
}
