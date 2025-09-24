
# Aplicación Web de Gestión de Medicamentos

Una aplicación web moderna desarrollada con React, TypeScript y Vite para la gestión y seguimiento de medicamentos.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Desarrollo](#desarrollo)
- [Construcción para Producción](#construcción-para-producción)
- [Despliegue](#despliegue)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Solución de Problemas](#solución-de-problemas)

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:

- **Node.js** (versión 18.0.0 o superior)
  - Descarga desde: https://nodejs.org/
  - Verifica la instalación: `node --version`
- **npm** (viene incluido con Node.js)
  - Verifica la instalación: `npm --version`
- **Git** (opcional, para clonar el repositorio)
  - Descarga desde: https://git-scm.com/

## 📦 Instalación

### 1. Obtener el código fuente

Si tienes acceso al repositorio Git:
```bash
git clone https://github.com/andrade1403/maquetacion.git
cd maquetacion/web
```

O si tienes los archivos descargados:
```bash
# Navega hasta la carpeta web del proyecto
cd ruta/hacia/el/proyecto/web
```

### 2. Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias listadas en el `package.json`.

## 🚀 Desarrollo

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite. La aplicación estará disponible en:
- **URL Local**: http://localhost:3000/
- La aplicación se recargará automáticamente cuando realices cambios en el código

### Comandos útiles durante el desarrollo

- **Detener el servidor**: `Ctrl + C` en la terminal
- **Limpiar caché**: `npm run dev -- --force`

## 🏗️ Construcción para Producción

### Generar build de producción

```bash
npm run build
```

Este comando:
- Compila y optimiza el código TypeScript
- Minifica los archivos CSS y JavaScript
- Optimiza las imágenes y otros recursos
- Genera los archivos estáticos en la carpeta `dist/`

### Previsualizar el build de producción

```bash
npx vite preview
```

Esto iniciará un servidor local para previsualizar la versión de producción.

## 🌐 Despliegue

### Opción 1: Despliegue en Vercel (Recomendado)

1. **Crear cuenta en Vercel**: https://vercel.com/
2. **Instalar Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
3. **Desplegar**:
   ```bash
   vercel --prod
   ```

### Opción 2: Despliegue en Netlify

1. **Crear cuenta en Netlify**: https://netlify.com/
2. **Instalar Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```
3. **Construir y desplegar**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Opción 3: Servidor Web Tradicional

1. **Construir la aplicación**:
   ```bash
   npm run build
   ```
2. **Subir la carpeta `dist/`** a tu servidor web (Apache, Nginx, etc.)
3. **Configurar el servidor** para servir archivos estáticos y manejar rutas SPA

### Opción 4: Docker (Avanzado)

Crear un `Dockerfile` en la raíz del proyecto web:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Comandos para construir y ejecutar:
```bash
docker build -t medicina-app .
docker run -p 80:80 medicina-app
```

## 🛠️ Tecnologías Utilizadas

### Core
- **React 18.3.1** - Biblioteca para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite 6.3.5** - Herramienta de construcción y desarrollo

### UI Components
- **Radix UI** - Componentes de UI accesibles y no estilos
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos SVG

### Funcionalidades
- **React Hook Form** - Manejo de formularios
- **React Router** - Navegación (si se implementa)
- **Recharts** - Gráficos y visualizaciones
- **Sonner** - Notificaciones toast

## 📁 Estructura del Proyecto

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

## 🔍 Solución de Problemas

### Problema: Error al instalar dependencias
```bash
# Limpiar caché de npm
npm cache clean --force
# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json
# Reinstalar
npm install
```

### Problema: Puerto 3000 ya está en uso
```bash
# Usar un puerto diferente
npm run dev -- --port 3001
```

### Problema: Errores de TypeScript
```bash
# Verificar configuración de TypeScript
npx tsc --noEmit
```

### Problema: Errores de construcción
```bash
# Construcción con información detallada
npm run build -- --mode development
```

## 📧 Soporte

Si encuentras algún problema durante el despliegue, verifica:

1. **Versiones de Node.js y npm** son las correctas
2. **Todas las dependencias** se instalaron correctamente
3. **No hay conflictos de puertos** en tu sistema
4. **Permisos de escritura** en la carpeta del proyecto

---

**Desarrollado con ❤️ usando React + TypeScript + Vite**  