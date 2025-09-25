# README.md — Instrucciones para ejecutar la app (MediAlarm)

## Instrucciones iniciales
Clonar el repositorio de GitHub y desde la **raíz del proyecto**, entrar a la carpeta `app` antes de ejecutar cualquier comando en una terminal de bash o powershell.

```bash
git clone https://github.com/andrade1403/maquetacion.git
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

## 5. Arrancar la app (paso a paso — **usar dos terminales**)

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

El paso anterior puede fallar porque el emulador predeterminado puede tardar en iniciar. Si esto ocurre, simplemente vuelve a ejecutar el comando `npx react-native run-android` cuando el emulador este listo.

Como alternativa, puedes instalar [Android Studio](https://developer.android.com/studio?hl=es-419), crear un nuevo emulador y, utilizando el APK generado en la siguiente [ruta](https://uniandes-my.sharepoint.com/:u:/g/personal/d_andrades_uniandes_edu_co/EQA5X8xB205OiHvZpo6Wc5UBesOBR3cbEc-EvHMu_3nIcA), arrastrar dicho archivo a la ventana principal de Android Studio para instalar la aplicación en un emulador existente.
