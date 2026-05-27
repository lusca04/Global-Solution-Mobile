package com.fiap.mobile.global_solution_api.controller;

import com.fiap.mobile.global_solution_api.model.Sensor;
import com.fiap.mobile.global_solution_api.service.SensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensores")
@RequiredArgsConstructor
public class SensorController {

    private final SensorService sensorService;

    @GetMapping
    public List<Sensor> listarTodos() {
        return sensorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Sensor buscarPorId(@PathVariable Long id) {
        return sensorService.buscarPorId(id);
    }

    @GetMapping("/ativos")
    public List<Sensor> listarAtivos() {
        return sensorService.listarAtivos();
    }

    @GetMapping("/tipo/{tipo}")
    public List<Sensor> listarPorTipo(@PathVariable Sensor.TipoSensor tipo) {
        return sensorService.listarPorTipo(tipo);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Sensor criar(@RequestBody Sensor sensor) {
        return sensorService.salvar(sensor);
    }

    @PutMapping("/{id}")
    public Sensor atualizar(@PathVariable Long id, @RequestBody Sensor sensor) {
        return sensorService.atualizar(id, sensor);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        sensorService.deletar(id);
    }
}
