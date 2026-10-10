# Simuladores interactivos

Estos pequeños simuladores funcionan en el navegador y sirven para practicar los conceptos. Los resultados son educativos y modelan solo las reglas descritas; no representan todos los detalles internos de un sistema operativo real.

## Simulador Round Robin

Introduce ráfagas de CPU separadas por comas y un quantum positivo. Por ejemplo, `5,3,1` y quantum `2`.

<div class="simulator">
  <label for="rr-bursts">Ráfagas de CPU (unidades de tiempo)</label>
  <input id="rr-bursts" value="5,3,1" inputmode="numeric">
  <label for="rr-quantum">Quantum</label>
  <input id="rr-quantum" type="number" min="1" value="2">
  <button type="button" id="rr-run">Simular Round Robin</button>
  <pre id="rr-output" aria-live="polite">Pulsa «Simular Round Robin» para ver el resultado.</pre>
</div>

## Calculadora de paginación

Ingresa dirección lógica, tamaño de página y número de marco. La página calculada debe ser la que realmente se encuentra en ese marco; la herramienta no consulta una tabla de páginas real.

<div class="simulator">
  <label for="mem-address">Dirección lógica</label>
  <input id="mem-address" type="number" min="0" value="5000">
  <label for="mem-size">Tamaño de página en bytes</label>
  <input id="mem-size" type="number" min="1" value="1024">
  <label for="mem-frame">Número de marco físico</label>
  <input id="mem-frame" type="number" min="0" value="12">
  <button type="button" id="mem-run">Calcular dirección física</button>
  <pre id="mem-output" aria-live="polite">Pulsa «Calcular dirección física» para ver el resultado.</pre>
</div>

## Simulador de ajuste de memoria

Escribe tamaños de huecos libres separados por comas y el tamaño solicitado. Cada algoritmo se evalúa de forma independiente con una única asignación.

<div class="simulator">
  <label for="fit-holes">Huecos libres (KB)</label>
  <input id="fit-holes" value="100,500,200,300,600">
  <label for="fit-request">Solicitud (KB)</label>
  <input id="fit-request" type="number" min="1" value="212">
  <button type="button" id="fit-run">Comparar algoritmos</button>
  <pre id="fit-output" aria-live="polite">Pulsa «Comparar algoritmos» para ver el resultado.</pre>
</div>
