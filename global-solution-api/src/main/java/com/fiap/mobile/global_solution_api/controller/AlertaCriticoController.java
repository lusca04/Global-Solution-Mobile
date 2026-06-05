package com.fiap.mobile.global_solution_api.controller;

import com.fiap.mobile.global_solution_api.model.AlertaCritico;
import com.fiap.mobile.global_solution_api.service.AlertaCriticoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alertas")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AlertaCriticoController {

    private final AlertaCriticoService alertaService;

    @GetMapping
    public List<AlertaCritico> listarTodos() {
        return alertaService.listarTodos();
    }

    @GetMapping("/{id}")
    public AlertaCritico buscarPorId(@PathVariable Long id) {
        return alertaService.buscarPorId(id);
    }

    @GetMapping("/nao-resolvidos")
    public List<AlertaCritico> listarNaoResolvidos() {
        return alertaService.listarNaoResolvidos();
    }

    @GetMapping("/nivel/{nivel}")
    public List<AlertaCritico> listarPorNivel(@PathVariable AlertaCritico.NivelAlerta nivel) {
        return alertaService.listarPorNivel(nivel);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AlertaCritico criar(@RequestBody AlertaCritico alerta) {
        return alertaService.salvar(alerta);
    }

    @PatchMapping("/{id}/resolver")
    public AlertaCritico resolver(@PathVariable Long id) {
        return alertaService.resolver(id);
    }

    @PutMapping("/{id}")
    public AlertaCritico atualizar(@PathVariable Long id, @RequestBody AlertaCritico alerta) {
        return alertaService.atualizar(id, alerta);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        alertaService.deletar(id);
    }
}
