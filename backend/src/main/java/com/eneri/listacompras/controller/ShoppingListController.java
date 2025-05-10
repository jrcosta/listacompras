package com.eneri.listacompras.controller;

import com.eneri.listacompras.dto.ItemDTO;
import com.eneri.listacompras.dto.ShoppingListDTO;
import com.eneri.listacompras.model.ShoppingList;
import com.eneri.listacompras.model.Item;
import com.eneri.listacompras.service.ShoppingListService;
import com.eneri.listacompras.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "http://localhost:8081")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<ShoppingListDTO> getAllLists() {
        return shoppingListService.findAll().stream()
                .map(l -> new ShoppingListDTO(l.getId(), l.getNome(), l.getCreatedAt()))
                .toList();
    }

    @GetMapping("/{id}")
    public ShoppingList getListById(@PathVariable Long id) {
        return shoppingListService.findById(id);
    }

    @PostMapping
    public ShoppingList createList(@RequestBody ShoppingList shoppingList) {
        return shoppingListService.create(shoppingList);
    }

    @PutMapping("/{id}")
    public ShoppingList updateList(@PathVariable Long id, @RequestBody ShoppingList updated) {
        return shoppingListService.update(id, updated.getNome());
    }

    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable Long id) {
        shoppingListService.delete(id);
    }

    @PostMapping("/{id}/items")
    public Item addItem(@PathVariable Long id, @RequestBody Item item) {
        return shoppingListService.addItem(id, item);
    }

    @GetMapping("/{id}/items")
    public List<ItemDTO> getItemsByList(@PathVariable Long id) {
        return itemService.findByListId(id).stream()
                .map(item -> new ItemDTO(
                        item.getId(),
                        item.getDescricao(),
                        item.getQuantidade(),
                        item.getPrecoPago(),
                        item.isComprado()
                ))
                .toList();
    }
}
