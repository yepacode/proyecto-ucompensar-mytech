# 📘 Guía Completa: Git y Bitbucket

Esta guía te ayudará a configurar Git y subir tu proyecto a Bitbucket paso a paso.

## 🔧 PASO 1: Instalar Git

### Windows
1. Descarga Git desde: https://git-scm.com/download/win
2. Ejecuta el instalador
3. Deja las opciones por defecto

### Mac
```bash
brew install git
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get install git
```

### Verificar instalación
```bash
git --version
```

## 🎯 PASO 2: Configurar Git

```bash
# Configurar nombre
git config --global user.name "Tu Nombre"

# Configurar email
git config --global user.email "tu.email@ejemplo.com"

# Verificar configuración
git config --list
```

## 🌐 PASO 3: Crear Repositorio en Bitbucket

### 3.1 Crear cuenta en Bitbucket
1. Ve a https://bitbucket.org/
2. Haz clic en "Sign up" (Registrarse)
3. Completa el registro con tu email

### 3.2 Crear nuevo repositorio
1. Haz clic en el botón "+" en la parte superior
2. Selecciona "Create repository"
3. Completa los datos:
   - **Repository name**: proyecto-mytech-frontend
   - **Access level**: ✅ **Marcar como PÚBLICO** (importante para la actividad)
   - **Description**: Proyecto Angular Frontend con Sass para UCompensar
   - **Include README**: No (ya tenemos uno)
   - **Version control system**: Git
4. Haz clic en "Create repository"

### 3.3 Copiar URL del repositorio
Después de crear, verás una URL como:
```
https://[tu-usuario]@bitbucket.org/[tu-usuario]/proyecto-mytech-frontend.git
```
**¡Cópiala!** La necesitarás en el siguiente paso.

## 📦 PASO 4: Inicializar Git en tu Proyecto

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# Inicializar repositorio Git
git init

# Ver estado de los archivos
git status

# Agregar todos los archivos al staging
git add .

# Hacer el primer commit
git commit -m "Proyecto inicial Angular con Sass - Actividad de profundización"
```

## 🚀 PASO 5: Conectar con Bitbucket y Subir

```bash
# Conectar repositorio local con Bitbucket
git remote add origin [URL-QUE-COPIASTE-EN-PASO-3.3]

# Ejemplo:
# git remote add origin https://tuusuario@bitbucket.org/tuusuario/proyecto-mytech-frontend.git

# Verificar que se agregó correctamente
git remote -v

# Subir código a Bitbucket (primera vez)
git push -u origin master

# Si te pide credenciales, ingresa:
# Usuario: tu usuario de Bitbucket
# Password: tu contraseña de Bitbucket
```

### Si te da error con "master" vs "main"
```bash
# Renombrar rama a master
git branch -M master
git push -u origin master
```

## 📝 PASO 6: Hacer Cambios y Actualizar

Cada vez que hagas cambios en tu proyecto:

```bash
# Ver qué archivos cambiaron
git status

# Agregar cambios al staging
git add .

# Hacer commit con mensaje descriptivo
git commit -m "Descripción clara de los cambios realizados"

# Ejemplos de buenos mensajes:
# git commit -m "Agregado componente de servicios con animaciones"
# git commit -m "Implementadas 5 variables Sass y anidación"
# git commit -m "Corregido responsive design en header"

# Subir cambios a Bitbucket
git push origin master
```

## ✅ PASO 7: Verificar en Bitbucket

1. Ve a tu repositorio en Bitbucket
2. Deberías ver todos tus archivos
3. Verifica que el proyecto esté **público** (ícono de globo)
4. Copia la URL del repositorio para entregarla en la actividad

### URL para compartir:
```
https://bitbucket.org/[tu-usuario]/proyecto-mytech-frontend
```

## 🎯 Comandos Git Más Útiles

```bash
# Ver historial de commits
git log

# Ver historial resumido
git log --oneline

# Ver diferencias de archivos
git diff

# Ver estado del repositorio
git status

# Ver ramas
git branch

# Crear nueva rama
git branch nombre-rama

# Cambiar de rama
git checkout nombre-rama

# Deshacer cambios en un archivo (antes de add)
git checkout -- nombre-archivo

# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Ver repositorios remotos
git remote -v
```

## 🔐 Consejos de Seguridad

1. **NUNCA** subas contraseñas o keys en el código
2. Usa `.gitignore` para excluir archivos sensibles
3. No subas `node_modules` (ya está en .gitignore)

## 🆘 Solución de Problemas Comunes

### Error: "fatal: not a git repository"
```bash
# Asegúrate de estar en la carpeta correcta
cd proyecto-mytech
git init
```

### Error: "failed to push some refs"
```bash
# Primero jala los cambios remotos
git pull origin master --allow-unrelated-histories
git push origin master
```

### Olvidé el mensaje del commit
```bash
# Git abrirá un editor, escribe el mensaje y guarda
git commit
```

### Quiero cambiar el último mensaje de commit
```bash
git commit --amend -m "Nuevo mensaje"
```

## 📊 Flujo de Trabajo Recomendado

```
1. Hacer cambios en el código
   ↓
2. git status (ver cambios)
   ↓
3. git add . (agregar cambios)
   ↓
4. git commit -m "mensaje" (guardar cambios)
   ↓
5. git push origin master (subir a Bitbucket)
   ↓
6. Verificar en Bitbucket que se subió correctamente
```

## 🎓 Para la Actividad

Asegúrate de:
- ✅ Repositorio público en Bitbucket
- ✅ README.md completo
- ✅ Commits con mensajes claros
- ✅ Todos los archivos subidos
- ✅ URL del repositorio copiada para entregar

## 🔗 Recursos Adicionales

- Documentación Git: https://git-scm.com/doc
- Tutorial Bitbucket: https://support.atlassian.com/bitbucket-cloud/
- Guía Git en español: https://git-scm.com/book/es/

---

**¿Dudas?** Revisa la documentación oficial o consulta con tu profesor.
