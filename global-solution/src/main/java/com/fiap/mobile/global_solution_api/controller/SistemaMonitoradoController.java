package com.fiap.mobile.global_solution_api.controller;

import com.fiap.mobile.global_solution_api.model.SistemaMonitorado;
import com.fiap.mobile.global_solution_api.service.SistemaMonitoradoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sistemas")
@RequiredArgsConstructor
public class SistemaMonitoradoController {

    private final SistemaMonitoradoService sistemaService;

    @GetMapping
    public List<SistemaMonitorado> listarTodos() {
        return sistemaService.listarTodos();
    }

    @GetMapping("/{id}")
    public SistemaMonitorado buscarPorId(@PathVariable Long id) {
        return sistemaService.buscarPorId(id);
    }

    @GetMapping("/status/{status}")
    public List<SistemaMonitorado> listarPorStatus(@PathVariable SistemaMonitorado.StatusSistema status) {
        return sistemaService.listarPorStatus(status);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SistemaMonitorado criar(@RequestBody SistemaMonitorado sistema) {
        return sistemaService.salvar(sistema);
    }

    @PutMapping("/{id}")
    public SistemaMonitorado atualizar(@PathVariable Long id, @RequestBody SistemaMonitorado sistema) {
        return sistemaService.atualizar(id, sistema);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        sistemaService.deletar(id);
    }
}
