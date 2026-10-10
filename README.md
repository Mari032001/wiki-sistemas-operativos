# Wiki de Sistemas Operativos 1

Proyecto académico incremental que cubre las cinco unidades de Sistemas Operativos 1 mediante una documentación web en español, ejemplos, diagramas Mermaid y simuladores interactivos.

## Requisitos

- Python 3.10 o superior recomendado.
- Git.
- Cuenta de GitHub para publicar el sitio.

## Ejecutar localmente

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Abre la dirección local que indique MkDocs (normalmente `http://127.0.0.1:8000`). Para generar el sitio estático:

```bash
mkdocs build --strict
```

Los archivos HTML generados quedan en `site/` (carpeta de salida, no se edita manualmente).

## Publicación en GitHub Pages

1. Crea un repositorio público llamado `wiki-sistemas-operativos`.
2. Copia los archivos de esta carpeta al repositorio.
3. Edita `mkdocs.yml`: sustituye `TU_USUARIO` por tu usuario real en `site_url` y `repo_url`.
4. En GitHub, entra a **Settings → Pages** y selecciona **GitHub Actions** como fuente de publicación.
5. Haz commit y push a la rama `main`. El flujo `.github/workflows/deploy.yml` instalará dependencias, compilará el sitio y lo publicará.
6. Verifica la URL pública que muestra GitHub Pages y prueba todas las páginas y simuladores.

No se incluye un enlace público real porque requiere una cuenta y un repositorio propios. No publiques credenciales ni tokens dentro del código.

## Estructura

```text
wiki-sistemas-operativos/
├── .github/workflows/deploy.yml
├── docs/
│   ├── index.md
│   ├── simuladores.md
│   ├── DEVELOPMENT.md
│   ├── assets/
│   │   ├── simulators.js
│   │   └── styles.css
│   └── unidades/
│       ├── unidad1.md
│       ├── unidad2.md
│       ├── unidad3.md
│       ├── unidad4.md
│       └── unidad5.md
├── mkdocs.yml
├── requirements.txt
├── README.md
└── DEVELOPMENT.md
```

## Entregables

- **Repositorio:** se obtiene al crear y subir el proyecto a GitHub/GitLab.
- **Wiki desplegada:** se obtiene al ejecutar el pipeline y publicar con Pages.
- **Documento de arquitectura:** `DEVELOPMENT.md`.

Antes de entregar, personaliza autor, curso, sección y fecha; revisa que la URL no contenga `TU_USUARIO`, verifica el build y añade las fuentes que hayas consultado realmente.
