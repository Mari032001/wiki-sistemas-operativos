(function () {
  'use strict';

  const raiz = document.getElementById('simulador-procesos');
  if (!raiz || raiz.dataset.iniciado === 'si') return;
  raiz.dataset.iniciado = 'si';

  const RAM_TOTAL = 1024;
  let siguientePid = 1;
  let ejecutando = [];
  let cola = [];
  let historial = [];

  const $ = (id) => document.getElementById(id);
  const nombre = $('sp-nombre');
  const memoria = $('sp-memoria');
  const duracion = $('sp-duracion');
  const mensaje = $('sp-mensaje');

  function ramUsada() {
    return ejecutando.reduce((total, p) => total + p.memoria, 0);
  }

  function notificar(texto, error) {
    mensaje.textContent = texto;
    mensaje.classList.toggle('sp-error', Boolean(error));
  }

  function crearProceso(nombreProceso, memoriaProceso, duracionProceso) {
    const proceso = {
      pid: siguientePid++,
      nombre: nombreProceso,
      memoria: memoriaProceso,
      duracion: duracionProceso,
      restante: duracionProceso,
      estado: 'EN_COLA',
      inicio: Date.now()
    };

    if (memoriaProceso <= RAM_TOTAL - ramUsada()) {
      proceso.estado = 'EJECUTANDO';
      ejecutando.push(proceso);
    } else {
      cola.push(proceso);
    }
    return proceso;
  }

  function iniciarDesdeCola() {
    while (cola.length > 0) {
      const proceso = cola[0];
      if (proceso.memoria > RAM_TOTAL - ramUsada()) break;
      cola.shift();
      proceso.estado = 'EJECUTANDO';
      proceso.restante = proceso.duracion;
      proceso.inicio = Date.now();
      proceso.fin = Date.now() + proceso.duracion * 1000;
      ejecutando.push(proceso);
    }
  }

  function elemento(tag, texto) {
    const nodo = document.createElement(tag);
    nodo.textContent = texto;
    return nodo;
  }

  function pintarTabla(id, procesos, vacio, enEjecucion) {
    const cuerpo = $(id);
    cuerpo.replaceChildren();

    if (procesos.length === 0) {
      const fila = document.createElement('tr');
      const celda = elemento('td', vacio);
      celda.colSpan = 5;
      fila.appendChild(celda);
      cuerpo.appendChild(fila);
      return;
    }

    procesos.forEach((p) => {
      const fila = document.createElement('tr');
      [
        p.pid,
        p.nombre,
        p.memoria + ' MB',
        enEjecucion ? Math.max(0, Math.ceil(p.restante)) + ' s' : p.duracion + ' s',
        p.estado
      ].forEach((valor) => fila.appendChild(elemento('td', String(valor))));
      cuerpo.appendChild(fila);
    });
  }

  function renderizar() {
    const usada = ramUsada();
    const disponible = RAM_TOTAL - usada;
    const porcentaje = usada / RAM_TOTAL * 100;

    $('sp-ram-total').textContent = RAM_TOTAL + ' MB';
    $('sp-ram-usada').textContent = usada + ' MB';
    $('sp-ram-disponible').textContent = disponible + ' MB';
    $('sp-barra').style.width = porcentaje + '%';
    $('sp-porcentaje').textContent = porcentaje.toFixed(1) + ' % utilizado';

    pintarTabla('sp-ejecucion', ejecutando, 'No hay procesos ejecutándose.', true);
    pintarTabla('sp-cola', cola, 'No hay procesos en espera.', false);

    const lista = $('sp-historial');
    lista.replaceChildren();
    if (historial.length === 0) {
      lista.appendChild(elemento('li', 'Aún no hay procesos finalizados.'));
    } else {
      historial.slice(-10).reverse().forEach((p) => {
        lista.appendChild(elemento(
          'li',
          'PID ' + p.pid + ' — ' + p.nombre + ': finalizado; liberó ' + p.memoria + ' MB.'
        ));
      });
    }
  }

  function actualizar() {
    const ahora = Date.now();
    const terminados = ejecutando.filter((p) => ahora >= p.fin);
    if (terminados.length > 0) {
      terminados.forEach((p) => {
        p.estado = 'FINALIZADO';
        historial.push(p);
      });
      ejecutando = ejecutando.filter((p) => ahora < p.fin);
      iniciarDesdeCola();
    }

    ejecutando.forEach((p) => {
      p.restante = Math.max(0, (p.fin - ahora) / 1000);
    });
    renderizar();
  }

  function programar(proceso) {
    if (proceso.estado === 'EJECUTANDO') {
      proceso.fin = Date.now() + proceso.duracion * 1000;
      proceso.restante = proceso.duracion;
    }
  }

  function crearYProgramar(nombreProceso, memoriaProceso, duracionProceso) {
    const proceso = crearProceso(nombreProceso, memoriaProceso, duracionProceso);
    programar(proceso);
    return proceso;
  }

  $('sp-crear').addEventListener('click', () => {
    const n = nombre.value.trim();
    const m = Number(memoria.value);
    const d = Number(duracion.value);

    if (!n) {
      notificar('Escribe un nombre para el proceso.', true);
      nombre.focus();
      return;
    }
    if (!Number.isInteger(m) || m < 1 || m > RAM_TOTAL) {
      notificar('La memoria debe ser un número entero entre 1 y 1024 MB.', true);
      memoria.focus();
      return;
    }
    if (!Number.isInteger(d) || d < 1 || d > 300) {
      notificar('La duración debe ser un número entero entre 1 y 300 segundos.', true);
      duracion.focus();
      return;
    }

    const proceso = crearYProgramar(n, m, d);
    notificar(
      proceso.estado === 'EJECUTANDO'
        ? 'Proceso ' + proceso.pid + ' creado y ejecutándose.'
        : 'Proceso ' + proceso.pid + ' creado y agregado a la cola de espera.'
    );
    nombre.value = '';
    renderizar();
  });

  $('sp-automaticos').addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
      const m = Math.floor(Math.random() * 251) + 50;
      const d = Math.floor(Math.random() * 11) + 5;
      crearYProgramar('Proceso-' + siguientePid, m, d);
    }
    notificar('Se crearon 3 procesos automáticamente.');
    renderizar();
  });

  $('sp-reiniciar').addEventListener('click', () => {
    ejecutando = [];
    cola = [];
    historial = [];
    siguientePid = 1;
    notificar('Simulación reiniciada. Toda la memoria está disponible.');
    renderizar();
  });

  renderizar();
  window.setInterval(actualizar, 500);
})();

