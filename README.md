# README.md — Instrucciones para ejecutar la app (MediAlarm)

## Instrucciones iniciales
Desde la **raíz del proyecto**, entrar a la carpeta `app` antes de ejecutar cualquier comando en una terminal de bash o powershell.

```bash
cd app
```

---

## 1. Requisitos previos
- **Node.js** v18
- **Java (JDK)** v17
- **Android Studio** (incluye SDK, AVD Manager y herramientas como `adb`, `emulator`, `sdkmanager`).
- **Android SDK** con las plataformas/build-tools necesarias para la versión `compileSdkVersion` del proyecto.
- **Gradle** (el wrapper del proyecto suele encargarse).
- Un **emulador Android (AVD)** o un **dispositivo físico** con depuración USB activada.

---

## 2. Verificar instalaciones (ejecutar en terminal)
```bash
node -v          # -> debe mostrar v18.x.x
java -version    # -> debe mostrar Java 17
```

Comprobar que `adb` y `emulator` están accesibles:
```bash
adb --version
emulator -list-avds
```

---

## 4. Preparar el proyecto
En la carpeta `app`:
```bash
npm install
```

---

## 5. Arrancar la app (paso a paso — **usa dos terminales**)

**Terminal A — iniciar Metro (bundler)**  
(El bundler debe estar en ejecución antes de build/instalación)
```bash
npx react-native start
```
En caso de necesitar limpiar el cache:
```bash
npx react-native start --reset-cache
```

**Terminal B — compilar e instalar en Android**
(Con el bundler ya en ejecución)
```bash
npx react-native run-android
```
