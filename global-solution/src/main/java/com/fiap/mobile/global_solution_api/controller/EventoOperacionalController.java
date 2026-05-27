package com.fiap.mobile.global_solution_api.controller;

import com.fiap.mobile.global_solution_api.model.EventoOperacional;
import com.fiap.mobile.global_solution_api.service.EventoOperacionalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@RequiredArgsConstructor
public class EventoOperacionalController {

    private final EventoOperacionalService eventoService;

    @GetMapping
    public List<EventoOperacional> listarTodos() {
        return eventoService.listarTodos();
    }

    @GetMapping("/{id}")
    public EventoOperacional buscarPorId(@PathVariable Long id) {
        return eventoService.buscarPorId(id);
    }

    @GetMapping("/tipo/{tipo}")
    public List<EventoOperacional> listarPorTipo(@PathVariable EventoOperacional.TipoEvento tipo) {
        return eventoService.listarPorTipo(tipo);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventoOperacional criar(@RequestBody EventoOperacional evento) {
        return eventoService.salvar(evento);
    }

    @PutMapping("/{id}")
    public EventoOperacional atualizar(@PathVariable Long id, @RequestBody EventoOperacional evento) {
        return eventoService.atualizar(id, evento);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        eventoService.deletar(id);
    }
}
