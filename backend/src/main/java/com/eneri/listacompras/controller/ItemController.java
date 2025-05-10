package com.eneri.listacompras.controller;

import com.eneri.listacompras.model.Item;
import com.eneri.listacompras.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:8081")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/{id}")
    public Item getById(@PathVariable Long id) {
        return itemService.findById(id);
    }

    @PatchMapping("/{id}")
    public Item updateItem(
            @PathVariable Long id,
            @RequestBody Item item
    ) {
        return itemService.update(
                id,
                item.getQuantidade(),
                item.getDescricao(),
                item.getPrecoPago(),
                item.isComprado()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.delete(id);
    }

    @GetMapping("/suggestions")
    public List<String> suggest(
            @RequestParam(name = "q", required = false) String q
    ) {
        return itemService.suggestDescricoes(q);
    }
}