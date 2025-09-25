
# Aplicación Web de Gestión de Medicamentos

Alarma para la gestión y seguimiento de medicamentos.

## Tabla de Contenidos

- [Aplicación Web de Gestión de Medicamentos](#aplicación-web-de-gestión-de-medicamentos)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
    - [1. Obtener el código fuente](#1-obtener-el-código-fuente)
    - [2. Instalar dependencias](#2-instalar-dependencias)
  - [Desarrollo](#desarrollo)
    - [Iniciar el servidor de desarrollo](#iniciar-el-servidor-de-desarrollo)
    - [Comandos útiles durante el desarrollo](#comandos-útiles-durante-el-desarrollo)
  - [Estructura del Proyecto](#estructura-del-proyecto)

## Requisitos Previos

Antes de comenzar, se debe tener instalado en el sistema:

- **Node.js** (versión 18.0.0 o superior)
  - Descarga desde: https://nodejs.org/
  - Verifica la instalación: `node --version`
- **npm** (viene incluido con Node.js)
  - Verifica la instalación: `npm --version`
- **Git** (opcional, para clonar el repositorio)
  - Descarga desde: https://git-scm.com/

## Instalación

### 1. Obtener el código fuente

```bash
git clone https://github.com/andrade1403/maquetacion.git
cd maquetacion/web
```

### 2. Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en el `package.json`.

## Desarrollo

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite. La aplicación estará disponible en:
- **URL Local**: http://localhost:3000/

### Comandos útiles durante el desarrollo

- **Detener el servidor**: `Ctrl + C` en la terminal
- **Limpiar caché**: `npm run dev -- --force`

## Estructura del Proyecto

```
web/
├── public/              # Archivos estáticos públicos
├── src/
│   ├── components/      # Componentes React reutilizables
│   │   ├── screens/     # Pantallas/páginas de la aplicación
│   │   ├── ui/          # Componentes base de UI
│   │   └── images/      # Componentes relacionados con imágenes
│   ├── styles/          # Archivos de estilos globales
│   ├── types/           # Definiciones de tipos TypeScript
│   ├── guidelines/      # Documentación y guías
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Punto de entrada
├── package.json         # Dependencias y scripts
├── vite.config.ts       # Configuración de Vite
├── tsconfig.json        # Configuración de TypeScript
└── README.md           # Este archivo
```