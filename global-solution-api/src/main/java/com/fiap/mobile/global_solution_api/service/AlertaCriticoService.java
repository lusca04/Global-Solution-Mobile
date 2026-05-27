package com.fiap.mobile.global_solution_api.service;

import com.fiap.mobile.global_solution_api.model.AlertaCritico;
import com.fiap.mobile.global_solution_api.repository.AlertaCriticoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertaCriticoService {

    private final AlertaCriticoRepository alertaRepository;

    public List<AlertaCritico> listarTodos() {
        return alertaRepository.findAll();
    }

    public AlertaCritico buscarPorId(Long id) {
        return alertaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Alerta não encontrado"));
    }

    public List<AlertaCritico> listarPorNivel(AlertaCritico.NivelAlerta nivel) {
        return alertaRepository.findByNivel(nivel);
    }

    public List<AlertaCritico> listarNaoResolvidos() {
        return alertaRepository.findByResolvido(false);
    }

    public AlertaCritico salvar(AlertaCritico alerta) {
        if (alerta.getDataHora() == null) {
            alerta.setDataHora(LocalDateTime.now());
        }
        return alertaRepository.save(alerta);
    }

    public AlertaCritico resolver(Long id) {
        AlertaCritico alerta = buscarPorId(id);
        alerta.setResolvido(true);
        return alertaRepository.save(alerta);
    }

    public AlertaCritico atualizar(Long id, AlertaCritico dadosNovos) {
        AlertaCritico alerta = buscarPorId(id);

        alerta.setMensagem(dadosNovos.getMensagem());
        alerta.setNivel(dadosNovos.getNivel());
        alerta.setResolvido(dadosNovos.isResolvido());
        alerta.setDataHora(dadosNovos.getDataHora());
        alerta.setEventoOperacional(dadosNovos.getEventoOperacional());

        return alertaRepository.save(alerta);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        alertaRepository.deleteById(id);
    }
}
