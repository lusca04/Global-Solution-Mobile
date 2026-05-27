package com.fiap.mobile.global_solution_api.service;

import com.fiap.mobile.global_solution_api.model.EventoOperacional;
import com.fiap.mobile.global_solution_api.repository.EventoOperacionalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventoOperacionalService {

    private final EventoOperacionalRepository eventoRepository;

    public List<EventoOperacional> listarTodos() {
        return eventoRepository.findAll();
    }

    public EventoOperacional buscarPorId(Long id) {
        return eventoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));
    }

    public List<EventoOperacional> listarPorTipo(EventoOperacional.TipoEvento tipo) {
        return eventoRepository.findByTipo(tipo);
    }

    public EventoOperacional salvar(EventoOperacional evento) {
        if (evento.getDataHora() == null) {
            evento.setDataHora(LocalDateTime.now());
        }
        return eventoRepository.save(evento);
    }

    public EventoOperacional atualizar(Long id, EventoOperacional dadosNovos) {
        EventoOperacional evento = buscarPorId(id);

        evento.setDescricao(dadosNovos.getDescricao());
        evento.setTipo(dadosNovos.getTipo());
        evento.setDataHora(dadosNovos.getDataHora());
        evento.setSistemaMonitorado(dadosNovos.getSistemaMonitorado());

        return eventoRepository.save(evento);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        eventoRepository.deleteById(id);
    }
}
