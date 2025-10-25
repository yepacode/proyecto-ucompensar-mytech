# 🚀 MyTech Solutions - Proyecto Angular Frontend

Proyecto de desarrollo web frontend con Angular, Sass, Git y animaciones modernas para la actividad de profundización.

## 📋 Requisitos de la Actividad

✅ **Control de versiones con Git y Bitbucket**
- ✓ Repositorio remoto en Bitbucket configurado
- ✓ Commits organizados
- ✓ Proyecto público para descarga remota

✅ **Implementación de Sass**
- ✓ 5+ variables Sass (Ver `/src/styles/utils/_variables.scss`)
- ✓ Anidación de selectores (Todos los componentes)
- ✓ 2 casos de interpolación (Ver `/src/styles/utils/_mixins.scss`)

## 🛠️ Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **Sass/SCSS** - Preprocesador CSS
- **TypeScript** - Lenguaje de programación
- **Git** - Control de versiones
- **Bitbucket** - Hosting del repositorio

## 📁 Estructura del Proyecto

```
proyecto-mytech/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/           # Navegación responsive
│   │   │   ├── hero/             # Sección principal
│   │   │   ├── servicios/        # Tarjetas de servicios
│   │   │   ├── portafolio/       # Proyectos
│   │   │   ├── contacto/         # Formulario de contacto
│   │   │   └── footer/           # Pie de página
│   │   ├── app.ts                # Componente principal
│   │   └── app.html              # Template principal
│   ├── styles/
│   │   ├── utils/
│   │   │   ├── _variables.scss   # 5+ VARIABLES SASS ✓
│   │   │   └── _mixins.scss      # INTERPOLACIÓN ✓
│   │   └── base/
│   │       ├── _base.scss        # ANIDACIÓN ✓
│   │       └── _animations.scss  # Animaciones keyframes
│   └── styles.scss               # Archivo principal de estilos
└── README.md
```

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio desde Bitbucket

```bash
git clone [URL-DEL-REPOSITORIO-BITBUCKET]
cd proyecto-mytech
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
ng serve
```

El proyecto estará disponible en `http://localhost:4200/`

### 4. Compilar para producción

```bash
ng build --configuration production
```

Los archivos compilados estarán en la carpeta `dist/`

## 📝 Características Implementadas

### ✨ Sass Avanzado

#### Variables Sass (5+)
```scss
// Colores
$color-primario: #00d4ff;
$color-secundario: #6366f1;
$color-acento: #f59e0b;

// Espaciados
$espaciado-sm: 1rem;
$espaciado-md: 1.5rem;

// Y más en _variables.scss
```

#### Anidación de Selectores
```scss
.header {
  &__navegacion {
    // Estilos
    
    &-item {
      // Anidación nivel 3
    }
  }
}
```

#### Interpolación (2 casos)
```scss
// Caso 1: Media queries dinámicas
@mixin responsive($breakpoint) {
  @media (min-width: #{$breakpoint}) {
    @content;
  }
}

// Caso 2: Propiedades dinámicas
@mixin propiedad-dinamica($propiedad, $valor) {
  #{$propiedad}: $valor;
}
```

## 🎯 Cumplimiento de Requisitos

| Requisito | Estado | Ubicación |
|-----------|--------|-----------|
| 5+ Variables Sass | ✅ | `/src/styles/utils/_variables.scss` |
| Anidación de selectores | ✅ | Todos los archivos `.scss` de componentes |
| 2 casos de interpolación | ✅ | `/src/styles/utils/_mixins.scss` líneas 8 y 13 |
| Repositorio Git | ✅ | Bitbucket (público) |
| Proyecto público | ✅ | Configurado para descarga |

## 📚 Estructura de Nomenclatura BEM

Utilizamos la metodología BEM (Block Element Modifier) para las clases CSS:

```scss
.bloque {              // Componente principal
  &__elemento {        // Parte del bloque
    &--modificador {   // Variación del elemento
    }
  }
}
```

## 👨‍💻 Autor

Desarrollado para **Desarrollo De Software Web Front-End** - UCompensar

---

**¿Necesitas ayuda?** Revisa la documentación de Angular en [angular.io](https://angular.io)
