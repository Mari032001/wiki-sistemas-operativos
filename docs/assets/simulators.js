(function () {
  'use strict';
  const byId = (id) => document.getElementById(id);
  const numbers = (text) => text.split(',').map((v) => Number(v.trim()));
  const validList = (arr) => arr.length > 0 && arr.every((v) => Number.isFinite(v) && v > 0);

  const rrButton = byId('rr-run');
  if (rrButton) rrButton.addEventListener('click', () => {
    const bursts = numbers(byId('rr-bursts').value);
    const quantum = Number(byId('rr-quantum').value);
    const out = byId('rr-output');
    if (!validList(bursts) || !Number.isInteger(quantum) || quantum <= 0) {
      out.textContent = 'Error: ingresa ráfagas positivas y un quantum entero positivo.'; return;
    }
    const remaining = bursts.slice();
    const queue = bursts.map((_, i) => i);
    const segments = [];
    const completion = Array(bursts.length).fill(0);
    let time = 0;
    while (queue.length) {
      const i = queue.shift();
      const run = Math.min(quantum, remaining[i]);
      const start = time;
      time += run;
      remaining[i] -= run;
      segments.push(`P${i + 1}: ${start}–${time}`);
      if (remaining[i] > 0) queue.push(i); else completion[i] = time;
    }
    const waiting = completion.map((c, i) => c - bursts[i]);
    out.textContent = `Gantt: ${segments.join(' | ')}\n\nTiempo de finalización: ${completion.map((v, i) => `P${i + 1}=${v}`).join(', ')}\nTiempo de espera (llegada 0): ${waiting.map((v, i) => `P${i + 1}=${v}`).join(', ')}\nEspera promedio: ${(waiting.reduce((a, b) => a + b, 0) / waiting.length).toFixed(2)}`;
  });

  const memButton = byId('mem-run');
  if (memButton) memButton.addEventListener('click', () => {
    const a = Number(byId('mem-address').value);
    const s = Number(byId('mem-size').value);
    const f = Number(byId('mem-frame').value);
    const out = byId('mem-output');
    if (!Number.isInteger(a) || a < 0 || !Number.isInteger(s) || s <= 0 || !Number.isInteger(f) || f < 0) {
      out.textContent = 'Error: usa dirección no negativa, tamaño positivo y marco no negativo; todos enteros.'; return;
    }
    const p = Math.floor(a / s), d = a % s, physical = f * s + d;
    out.textContent = `Página: floor(${a}/${s}) = ${p}\nDesplazamiento: ${a} mod ${s} = ${d}\nMarco asignado: ${f}\nDirección física: ${f} × ${s} + ${d} = ${physical}`;
  });

  const fitButton = byId('fit-run');
  if (fitButton) fitButton.addEventListener('click', () => {
    const holes = numbers(byId('fit-holes').value);
    const request = Number(byId('fit-request').value);
    const out = byId('fit-output');
    if (!validList(holes) || !Number.isFinite(request) || request <= 0) {
      out.textContent = 'Error: los huecos y la solicitud deben ser números positivos.'; return;
    }
    const choices = [
      ['First-fit', holes.findIndex((h) => h >= request)],
      ['Best-fit', holes.reduce((best, h, i) => h >= request && (best < 0 || h < holes[best]) ? i : best, -1)],
      ['Worst-fit', holes.reduce((best, h, i) => h >= request && (best < 0 || h > holes[best]) ? i : best, -1)]
    ];
    out.textContent = choices.map(([name, i]) => i < 0 ? `${name}: no hay hueco suficiente.` : `${name}: hueco ${i + 1} (${holes[i]} KB); sobrante ${holes[i] - request} KB.`).join('\n');
  });
})();
