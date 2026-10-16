# Simulador de Procesos

Practica la administración de procesos y la asignación de memoria RAM. Crea procesos, observa cuáles se ejecutan, cuáles esperan y cómo se libera la memoria cuando terminan.

!!! info "Objetivo"
    Este simulador es educativo. Utiliza una memoria RAM de 1024 MB y representa la ejecución de procesos en tiempo real dentro del navegador.

<div id="simulador-procesos" class="simulador-procesos">
  <div class="sp-encabezado">
    <h2>Simulador de Procesos</h2>
    <p>Administración de procesos y memoria RAM</p>
  </div>

  <div class="sp-metricas">
    <div class="sp-metrica">
      <span>RAM total</span>
      <strong id="sp-ram-total">1024 MB</strong>
    </div>
    <div class="sp-metrica">
      <span>RAM utilizada</span>
      <strong id="sp-ram-usada">0 MB</strong>
    </div>
    <div class="sp-metrica">
      <span>RAM disponible</span>
      <strong id="sp-ram-disponible">1024 MB</strong>
    </div>
  </div>

  <div class="sp-panel">
    <h3>Crear un proceso</h3>
    <label for="sp-nombre">Nombre del proceso</label>
    <input id="sp-nombre" type="text" maxlength="40" placeholder="Ej. Navegador">

    <label for="sp-memoria">Memoria requerida (MB)</label>
    <input id="sp-memoria" type="number" min="1" max="1024" value="200">

    <label for="sp-duracion">Duración (segundos)</label>
    <input id="sp-duracion" type="number" min="1" max="300" value="10">

    <div class="sp-botones">
      <button id="sp-crear" type="button">Crear proceso</button>
      <button id="sp-automaticos" type="button">Crear 3 automáticamente</button>
      <button id="sp-reiniciar" type="button">Reiniciar simulación</button>
    </div>
    <p id="sp-mensaje" class="sp-mensaje" role="status" aria-live="polite">Listo para crear procesos.</p>
  </div>

  <div class="sp-panel">
    <h3>Uso de memoria RAM</h3>
    <div class="sp-barra-fondo">
      <div id="sp-barra" class="sp-barra" style="width: 0%"></div>
    </div>
    <p id="sp-porcentaje">0 % utilizado</p>
  </div>

  <div class="sp-panel">
    <h3>Procesos en ejecución</h3>
    <div class="sp-tabla-contenedor">
      <table class="sp-tabla">
        <thead>
          <tr><th>PID</th><th>Nombre</th><th>RAM</th><th>Tiempo restante</th><th>Estado</th></tr>
        </thead>
        <tbody id="sp-ejecucion">
          <tr><td colspan="5">No hay procesos ejecutándose.</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sp-panel">
    <h3>Procesos en cola de espera</h3>
    <div class="sp-tabla-contenedor">
      <table class="sp-tabla">
        <thead>
          <tr><th>PID</th><th>Nombre</th><th>RAM</th><th>Duración</th><th>Estado</th></tr>
        </thead>
        <tbody id="sp-cola">
          <tr><td colspan="5">No hay procesos en espera.</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="sp-panel">
    <h3>Historial de procesos finalizados</h3>
    <ul id="sp-historial"><li>Aún no hay procesos finalizados.</li></ul>
  </div>
</div>
