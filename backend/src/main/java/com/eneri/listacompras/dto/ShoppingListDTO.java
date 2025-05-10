package com.eneri.listacompras.dto;

import java.time.LocalDateTime;

public record ShoppingListDTO(
        Long id,
        String nome,
        LocalDateTime createdAt
) {}
