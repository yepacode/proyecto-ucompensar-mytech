# ⚡ Guía de Inicio Rápido

## 🎯 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descarga: https://nodejs.org/
   - Verifica: `node --version`

2. **npm** (viene con Node.js)
   - Verifica: `npm --version`

3. **Angular CLI**
   - Instalar: `npm install -g @angular/cli`
   - Verifica: `ng version`

4. **Git**
   - Descarga: https://git-scm.com/
   - Verifica: `git --version`

## 🚀 Instalación en 3 Pasos

### 1️⃣ Instalar dependencias
```bash
cd proyecto-mytech
npm install
```

Esto instalará todas las dependencias necesarias. Toma unos minutos la primera vez.

### 2️⃣ Ejecutar en desarrollo
```bash
ng serve
```

O simplemente:
```bash
npm start
```

### 3️⃣ Abrir en el navegador
Abre tu navegador y ve a:
```
http://localhost:4200
```

¡Listo! 🎉 Deberías ver tu proyecto funcionando.

## 🔧 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
ng serve
# o
npm start

# Compilar para producción
ng build --configuration production

# Ejecutar tests
ng test

# Ejecutar linter
ng lint

# Crear nuevo componente
ng generate component nombre-componente

# Crear nuevo servicio
ng generate service nombre-servicio
```

## 🎨 Modificar Estilos

### Variables de color
Edita: `/src/styles/utils/_variables.scss`

```scss
$color-primario: #00d4ff;     // Cambia este color
$color-secundario: #6366f1;   // O este
```

### Estilos de componentes
Cada componente tiene su propio archivo `.scss`:
```
/src/app/components/header/header.component.scss
/src/app/components/hero/hero.component.scss
```

## 📝 Agregar Contenido

### Modificar texto del Hero
Edita: `/src/app/components/hero/hero.component.html`

### Agregar nuevos servicios
Edita: `/src/app/components/servicios/servicios.component.ts`

```typescript
servicios: Servicio[] = [
  {
    titulo: 'Nuevo Servicio',
    descripcion: 'Descripción del servicio',
    // ...
  }
];
```

## 🔄 Actualizar Proyecto

Después de hacer cambios, guárdalos en Git:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin master
```

## 🐛 Solución de Problemas

### El proyecto no inicia
```bash
# Limpia node_modules y reinstala
rm -rf node_modules
npm install
```

### Error de puerto en uso
```bash
# Usa otro puerto
ng serve --port 4201
```

### Cambios no se ven
```bash
# Ctrl + C para detener el servidor
# Vuelve a ejecutar
ng serve
```

### Error al compilar Sass
```bash
# Verifica la sintaxis en los archivos .scss
# Busca llaves sin cerrar o punto y coma faltantes
```

## 📱 Ver en dispositivos móviles

1. Encuentra tu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Ejecuta con host:
```bash
ng serve --host 0.0.0.0
```

3. Abre en tu móvil:
```
http://[TU-IP]:4200
```

## 🎓 Próximos Pasos

1. ✅ Familiarízate con la estructura del proyecto
2. ✅ Modifica colores y contenido
3. ✅ Agrega tus propias animaciones
4. ✅ Implementa más componentes
5. ✅ Sube cambios a Bitbucket

## 📚 Recursos de Aprendizaje

- **Angular**: https://angular.io/docs
- **Sass**: https://sass-lang.com/guide
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Git**: https://git-scm.com/book/es/

---

**¿Necesitas más ayuda?** Consulta el README.md o la GUIA-GIT-BITBUCKET.md
