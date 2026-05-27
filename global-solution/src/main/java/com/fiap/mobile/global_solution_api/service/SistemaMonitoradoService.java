package com.fiap.mobile.global_solution_api.service;

import com.fiap.mobile.global_solution_api.model.SistemaMonitorado;
import com.fiap.mobile.global_solution_api.repository.SistemaMonitoradoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SistemaMonitoradoService {

    private final SistemaMonitoradoRepository sistemaRepository;

    public List<SistemaMonitorado> listarTodos() {
        return sistemaRepository.findAll();
    }

    public SistemaMonitorado buscarPorId(Long id) {
        return sistemaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sistema não encontrado"));
    }

    public List<SistemaMonitorado> listarPorStatus(SistemaMonitorado.StatusSistema status) {
        return sistemaRepository.findByStatus(status);
    }

    public SistemaMonitorado salvar(SistemaMonitorado sistema) {
        return sistemaRepository.save(sistema);
    }

    public SistemaMonitorado atualizar(Long id, SistemaMonitorado dadosNovos) {
        SistemaMonitorado sistema = buscarPorId(id);

        sistema.setNome(dadosNovos.getNome());
        sistema.setDescricao(dadosNovos.getDescricao());
        sistema.setStatus(dadosNovos.getStatus());
        sistema.setSensor(dadosNovos.getSensor());

        return sistemaRepository.save(sistema);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        sistemaRepository.deleteById(id);
    }
}
