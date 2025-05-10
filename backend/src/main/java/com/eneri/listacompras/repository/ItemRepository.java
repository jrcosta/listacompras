package com.eneri.listacompras.repository;

import com.eneri.listacompras.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByListaId(Long listaId);

    @Query("""
      select distinct i.descricao
        from Item i
       where lower(i.descricao) like lower(concat('%', :q, '%'))
       order by i.descricao
      """)
    List<String> suggestDescricoes(@Param("q") String q);
}
