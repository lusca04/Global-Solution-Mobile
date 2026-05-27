package com.fiap.mobile.global_solution_api.service;

import com.fiap.mobile.global_solution_api.model.Sensor;
import com.fiap.mobile.global_solution_api.repository.SensorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SensorService {

    private final SensorRepository sensorRepository;

    public List<Sensor> listarTodos() {
        return sensorRepository.findAll();
    }

    public Sensor buscarPorId(Long id) {
        return sensorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sensor não encontrado"));
    }

    public List<Sensor> listarAtivos() {
        return sensorRepository.findByAtivo(true);
    }

    public List<Sensor> listarPorTipo(Sensor.TipoSensor tipo) {
        return sensorRepository.findByTipo(tipo);
    }

    public Sensor salvar(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public Sensor atualizar(Long id, Sensor dadosNovos) {
        Sensor sensor = buscarPorId(id);

        sensor.setNome(dadosNovos.getNome());
        sensor.setTipo(dadosNovos.getTipo());
        sensor.setUnidade(dadosNovos.getUnidade());
        sensor.setLocalizacao(dadosNovos.getLocalizacao());
        sensor.setAtivo(dadosNovos.isAtivo());
        sensor.setDataInstalacao(dadosNovos.getDataInstalacao());

        return sensorRepository.save(sensor);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        sensorRepository.deleteById(id);
    }
}
