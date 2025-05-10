package com.eneri.listacompras.dto;

import java.math.BigDecimal;

public record ItemDTO(
        Long id,
        String descricao,
        Integer quantidade,
        BigDecimal precoPago,
        boolean comprado
) {}
