# Unidad 3. Concurrencia y sincronización

## 3.1 Concurrencia y sección crítica

La **concurrencia** ocurre cuando varias tareas progresan durante periodos que se solapan; pueden alternarse en una CPU o ejecutarse realmente en paralelo en varios núcleos. La **sección crítica** es la parte del programa que accede a un recurso compartido y que puede producir resultados incorrectos si varias tareas la ejecutan simultáneamente sin coordinación.

Una **condición de carrera** ocurre cuando el resultado depende del orden o del momento en que se intercalan operaciones concurrentes. Por ejemplo, dos hilos que leen el valor 10, suman 1 y escriben 11 pueden perder una actualización; el resultado correcto tras dos incrementos sería 12.

Una solución clásica de sección crítica busca cumplir:

1. **Exclusión mutua:** como máximo un proceso está en la sección crítica a la vez.
2. **Progreso:** si la sección crítica está libre y hay procesos que quieren entrar, la elección del siguiente no se posterga indefinidamente por procesos que no participan.
3. **Espera acotada:** existe un límite a cuántas veces otros pueden entrar antes de que un solicitante obtenga acceso.

## 3.2 Algoritmos de Dekker y Peterson

Los intentos históricos asociados con Dekker muestran por qué soluciones ingenuas no bastan:

- **Intento 1: alternancia estricta.** Una variable indica a quién le toca. Evita simultaneidad, pero puede impedir entrar a un proceso cuando el otro no desea hacerlo; falla el progreso.
- **Intento 2: intención de entrar.** Cada proceso marca su interés. Si ambos lo marcan a la vez y esperan que el otro desista, pueden quedar bloqueados; puede ocurrir interbloqueo.
- **Intentos intermedios:** retirar y volver a marcar la intención puede resolver algunos empates, pero sin una regla coordinada puede generar espera activa o nuevas violaciones de progreso.
- **Solución de Dekker:** combina indicadores de intención con una variable de turno para resolver el empate, bajo supuestos clásicos de memoria compartida y lecturas/escrituras atómicas.
- **Solución de Peterson:** usa dos indicadores de intención y una variable `turn`. Es una solución pedagógica para dos procesos bajo un modelo de memoria secuencialmente consistente; en hardware y lenguajes modernos se requieren garantías de memoria apropiadas.

Pseudocódigo de Peterson para el proceso `i`, donde `j = 1 - i`:

```text
flag[i] = true
turn = j
while flag[j] and turn == j:
    esperar
# sección crítica
flag[i] = false
```

Este algoritmo ilustra la lógica; no debe usarse como sustituto universal de mutex o primitivas de sincronización proporcionadas por el sistema y el lenguaje.

## 3.3 Semáforos

Un **semáforo** es una primitiva de sincronización con operaciones atómicas conceptuales `wait()` y `signal()` (también llamadas P y V en algunos textos).

- **Semáforo binario:** toma valores equivalentes a 0 y 1; puede utilizarse para exclusión mutua, aunque la semántica exacta depende de la implementación.
- **Semáforo contador:** representa varias instancias disponibles de un recurso.
- `wait(S)`: intenta adquirir una unidad; si no hay unidades, el hilo puede bloquearse.
- `signal(S)`: devuelve una unidad o despierta a un solicitante según la implementación.

Ejemplo conceptual:

```text
semáforo plazas = 3
al usar un recurso:
    wait(plazas)
    usar_recurso()
    signal(plazas)
```

El par `wait`/`signal` debe estar correctamente balanceado, incluso cuando se producen errores. En código real se prefieren mecanismos que garanticen liberación en todos los caminos de salida.

## 3.4 Monitores y variables de condición

Un **monitor** encapsula datos compartidos y operaciones que los manipulan, imponiendo exclusión mutua en sus procedimientos según su modelo. Las variables de condición permiten esperar a que se cumpla una condición y avisar cuando el estado cambia. `wait` normalmente libera temporalmente el bloqueo del monitor mientras espera y lo vuelve a adquirir al reanudar; `signal` despierta a un hilo que espera, con reglas que dependen de la semántica del monitor.

## 3.5 Paso de mensajes y memoria compartida

| Mecanismo | Funcionamiento | Ventajas | Riesgos o costos |
|---|---|---|---|
| Mensajes síncronos | Envío/recepción puede esperar a la otra parte | Coordinación explícita | Bloqueos si no se coordina el protocolo |
| Mensajes asíncronos | El emisor puede continuar tras colocar el mensaje en una cola | Desacoplamiento | Colas, orden y capacidad deben gestionarse |
| Comunicación directa | Se identifica al proceso destinatario | Relación explícita | Acoplamiento entre participantes |
| Comunicación indirecta | Se usa buzón, puerto o cola | Flexibilidad | Gestión del buzón y permisos |
| Memoria compartida | Procesos/hilos acceden a una región común | Alto rendimiento para grandes datos | Requiere sincronización para evitar carreras |

## 3.6 Ejemplo en Python con bloqueo

```python
from threading import Thread, Lock

contador = 0
candado = Lock()

def incrementar():
    global contador
    for _ in range(100_000):
        with candado:
            contador += 1

hilos = [Thread(target=incrementar) for _ in range(2)]
for hilo in hilos:
    hilo.start()
for hilo in hilos:
    hilo.join()

print(contador)  # 200000
```

El bloqueo protege la operación de lectura-modificación-escritura. La salida esperada es 200000. La implementación del intérprete no debe tomarse como garantía de seguridad para operaciones compartidas; el uso explícito de un bloqueo comunica la intención y evita depender de supuestos accidentales.

## Preguntas de repaso

1. ¿Qué diferencia hay entre concurrencia y paralelismo?
2. ¿Cuáles son las tres propiedades de una solución de sección crítica?
3. ¿Por qué los indicadores de intención por sí solos no resuelven todos los casos?
4. ¿Qué diferencia hay entre un semáforo binario y uno contador?
5. ¿Qué ventajas y riesgos tienen la memoria compartida y el paso de mensajes?

## Referencias sugeridas

- Silberschatz, Galvin y Gagne, *Operating System Concepts*.
- Python documentation: `threading.Lock` — https://docs.python.org/3/library/threading.html
