package com.eneri.listacompras.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String descricao;

    @NotNull
    @Positive
    @Column(nullable = false)
    private Integer quantidade;

    @NotNull
    @Positive
    @Column(name = "preco_pago", nullable = false, precision = 19, scale = 2)
    private BigDecimal precoPago;

    @Column(nullable = false)
    private boolean comprado = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_id", nullable = false)
    private ShoppingList lista;

    public Item() {}

    public Item(String descricao, Integer quantidade, BigDecimal precoPago) {
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.precoPago = precoPago;
    }

    // getters e setters

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPrecoPago() {
        return precoPago;
    }

    public void setPrecoPago(BigDecimal precoPago) {
        this.precoPago = precoPago;
    }

    public boolean isComprado() {
        return comprado;
    }

    public void setComprado(boolean comprado) {
        this.comprado = comprado;
    }

    public ShoppingList getLista() {
        return lista;
    }

    public void setLista(ShoppingList lista) {
        this.lista = lista;
    }
}
