package com.eneri.listacompras.repository;

import com.eneri.listacompras.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
    List<ShoppingList> findByNomeContainingIgnoreCase(String nome);
}
