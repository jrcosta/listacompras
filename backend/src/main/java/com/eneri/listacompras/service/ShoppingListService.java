package com.eneri.listacompras.service;

import com.eneri.listacompras.model.ShoppingList;
import com.eneri.listacompras.repository.ShoppingListRepository;
import com.eneri.listacompras.model.Item;
import com.eneri.listacompras.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository listRepo;

    @Autowired
    private ItemRepository itemRepo;

    public List<ShoppingList> findAll() {
        return listRepo.findAll();
    }

    public ShoppingList findById(Long id) {
        return listRepo.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Lista não encontrada")
                );
    }

    public ShoppingList create(ShoppingList lista) {
        return listRepo.save(lista);
    }

    @Transactional
    public ShoppingList update(Long id, String novoNome) {
        ShoppingList lista = findById(id);
        lista.setNome(novoNome);
        return lista;
    }

    public void delete(Long id) {
        if (!listRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Lista não encontrada");
        }
        listRepo.deleteById(id);
    }

    @Transactional
    public Item addItem(Long listId, Item item) {
        ShoppingList lista = findById(listId);
        lista.addItem(item);
        return item;
    }
}
