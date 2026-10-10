# Diccionario de Sistemas Operativos

Bienvenida, Marisol. Aquí puedes administrar los conceptos de tu wiki.

<div id="diccionario-app">

<label for="dict-search">Buscar palabras o definiciones</label>
<input id="dict-search" type="search" placeholder="Escribe para buscar..." />

<h2>Agregar o editar una palabra</h2>

<form id="dict-form">
  <label for="dict-word">Palabra o concepto</label>
  <input id="dict-word" type="text" required maxlength="100" placeholder="Ej. Sistema operativo" />

  <label for="dict-definition">Definición</label>
  <textarea id="dict-definition" required maxlength="2000" rows="4" placeholder="Escribe la definición"></textarea>

  <button type="submit" id="dict-save">Guardar palabra</button>
  <button type="button" id="dict-cancel" hidden>Cancelar edición</button>
</form>

<h2>Palabras guardadas</h2>
<p id="dict-count">Cargando palabras...</p>
<div id="dict-list"></div>

<h2>Copia de seguridad</h2>
<button type="button" id="dict-export">Exportar palabras</button>
<p>Para recuperar palabras guardadas anteriormente, selecciona una copia JSON:</p>
<input id="dict-import" type="file" accept=".json,application/json" />
<p id="dict-status" role="status" aria-live="polite"></p>

</div>
