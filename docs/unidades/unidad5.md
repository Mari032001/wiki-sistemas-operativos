# Unidad 5. Administración de memoria

## 5.1 Objetivo de la administración de memoria

La administración de memoria asigna memoria principal a procesos, registra qué regiones están ocupadas y protege los espacios de direcciones. En un sistema monoprogramado, gran parte de la memoria puede estar dedicada a un único programa; en uno multiprogramado, el SO debe mantener varios procesos aislados y cambiar sus asignaciones eficientemente.

La **reubicación** permite que un programa funcione aunque no se cargue siempre en la misma dirección física. La **protección** evita que un proceso acceda indebidamente a la memoria de otro o al núcleo.

## 5.2 Asignación contigua

En la asignación contigua, cada proceso ocupa una región continua de memoria física.

- **Particiones fijas:** memoria dividida previamente en regiones. Son simples, pero pueden desperdiciar espacio dentro de una partición.
- **Particiones variables:** las regiones se crean según el tamaño de los procesos. Pueden dejar huecos externos entre regiones asignadas.

### Algoritmos de ajuste

| Algoritmo | Regla | Ventaja | Limitación |
|---|---|---|---|
| First-fit | Toma el primer hueco suficientemente grande | Suele buscar menos | Puede acumular huecos al inicio |
| Best-fit | Toma el hueco más pequeño que alcanza | Busca minimizar el sobrante inmediato | Puede dejar muchos huecos pequeños; suele examinar más |
| Worst-fit | Toma el hueco más grande | Deja un hueco residual relativamente grande | No siempre produce el mejor uso global |

**Fragmentación interna:** espacio sin usar dentro de un bloque ya asignado. **Fragmentación externa:** espacio libre total suficiente, pero disperso en huecos no contiguos que no satisfacen una solicitud contigua.

### Ejemplo

Huecos libres: 100 KB, 500 KB, 200 KB, 300 KB, 600 KB. Solicitud: 212 KB.

- First-fit asigna 500 KB (primer hueco suficiente) y deja 288 KB.
- Best-fit asigna 300 KB (hueco suficiente más pequeño) y deja 88 KB.
- Worst-fit asigna 600 KB (hueco más grande) y deja 388 KB.

El ejemplo compara una sola asignación; el resultado general depende de la secuencia completa de solicitudes y liberaciones.

## 5.3 Paginación

La **paginación** divide el espacio lógico en páginas de tamaño fijo y la memoria física en marcos del mismo tamaño. Una página puede ubicarse en cualquier marco disponible, por lo que el proceso no necesita ocupar memoria física contigua.

La tabla de páginas relaciona número de página virtual con número de marco físico y puede incluir bits de validez, permisos, referencia y modificación. Una **TLB** (Translation Lookaside Buffer) es una caché de traducciones recientes para acelerar la conversión de direcciones.

Si el tamaño de página es `S`, una dirección lógica `A` se divide así:

- Número de página: `p = floor(A / S)`.
- Desplazamiento: `d = A mod S`.
- Si la tabla indica que la página `p` está en el marco `f`, dirección física: `F = f × S + d`.

Si la página no está residente, puede producirse un fallo de página; el SO debe cargarla o tratar la excepción según el sistema.

## 5.4 Segmentación

La **segmentación** divide el programa en unidades lógicas de tamaño variable, como código, datos y pila. La dirección lógica es un par (segmento, desplazamiento). La tabla de segmentos guarda una base y un límite por segmento. Si el desplazamiento supera el límite, el acceso no es válido; si es válido, la dirección física se obtiene sumando base + desplazamiento.

| Aspecto | Paginación | Segmentación |
|---|---|---|
| Tamaño de unidad | Fijo | Variable |
| División | Física/lógica por bloques de tamaño fijo | Según unidades lógicas del programa |
| Fragmentación típica | Interna en la última página | Externa por tamaños variables |
| Protección/compartición | Permisos por página | Puede alinearse naturalmente con módulos lógicos |
| Complejidad | Tabla de páginas y traducción | Tabla de segmentos, límites y asignación variable |

Algunas arquitecturas combinan ideas de segmentación y paginación; muchos sistemas modernos usan paginación como mecanismo central de memoria virtual.

## 5.5 Calculadora de direcciones

Para páginas de 1,024 bytes y dirección lógica 5,000:

- Página `p = floor(5000 / 1024) = 4`.
- Desplazamiento `d = 5000 mod 1024 = 904`.
- Si la página 4 está en el marco 12, dirección física `F = 12 × 1024 + 904 = 13,192`.

El cálculo supone que la página está presente y que el número de marco proporcionado es válido.

## Preguntas de repaso

1. ¿Por qué la multiprogramación requiere protección de memoria?
2. ¿En qué se diferencian la fragmentación interna y la externa?
3. ¿Qué regla aplica cada algoritmo First-fit, Best-fit y Worst-fit?
4. ¿Cómo se divide una dirección lógica en paginación?
5. ¿Qué diferencia conceptual existe entre una página y un segmento?

## Referencias sugeridas

- Silberschatz, Galvin y Gagne, *Operating System Concepts*.
- Documentación del kernel Linux: https://docs.kernel.org/
