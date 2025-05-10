package com.eneri.listacompras.service;

import com.eneri.listacompras.model.Item;
import com.eneri.listacompras.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepo;

    public List<String> suggestDescricoes(String q) {
        if (q == null || q.isBlank()) {
            return List.of();
        }
        return itemRepo.suggestDescricoes(q);
    }

    public List<Item> findByListId(Long listaId) {
        return itemRepo.findByListaId(listaId);
    }

    public Item findById(Long id) {
        return itemRepo.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
                );
    }

    public Item create(Long listaId, Item item) {
        // assumindo que ShoppingListService.addItem já trate do relacionamento
        return itemRepo.save(item);
    }

    @Transactional
    public Item update(Long id, Integer quantidade, String descricao,
                       java.math.BigDecimal precoPago, Boolean comprado) {
        Item item = findById(id);
        if (quantidade != null)  item.setQuantidade(quantidade);
        if (descricao != null)   item.setDescricao(descricao);
        if (precoPago != null)   item.setPrecoPago(precoPago);
        if (comprado != null)    item.setComprado(comprado);
        return item;
    }

    public void delete(Long id) {
        if (!itemRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado");
        }
        itemRepo.deleteById(id);
    }
}
