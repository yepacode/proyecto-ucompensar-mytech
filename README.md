# MyTech Solutions

Plataforma web fullstack de una empresa ficticia de desarrollo de software, construida con **Angular 20** (frontend) y **Laravel 12** (backend API REST). Proyecto universitario para la materia de Desarrollo de Software Web — **UCompensar**.

El sitio presenta servicios, portafolio de proyectos, tecnologias y un formulario de contacto. Todo el contenido es editable a traves de una API protegida con autenticacion. La base de datos implementa relaciones reales con **Foreign Keys** (1:N y N:N via tabla pivot).

---

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Como Ejecutar el Proyecto](#como-ejecutar-el-proyecto)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Base de Datos (MER)](#base-de-datos-mer)
- [Relaciones de la Base de Datos](#relaciones-de-la-base-de-datos)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autenticacion](#autenticacion)
- [Sistema de Estilos (SCSS)](#sistema-de-estilos-scss)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Despliegue](#despliegue)

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

| Herramienta | Version minima | Verificar con |
|-------------|---------------|---------------|
| **Node.js** | 18.x o superior | `node -v` |
| **npm** | 9.x o superior | `npm -v` |
| **PHP** | 8.2 o superior | `php -v` |
| **Composer** | 2.x | `composer -V` |
| **MySQL** | 8.x | `mysql --version` |

> Se recomienda usar **XAMPP** o **Laragon** para tener MySQL y PHP preconfigurados en Windows.

---

## Como Ejecutar el Proyecto

### Paso 1: Clonar el repositorio

```bash
git clone [URL-DEL-REPOSITORIO]
cd u.compensar-mytech
```

### Paso 2: Configurar la base de datos

1. Abrir MySQL (via XAMPP, Laragon o terminal) y crear la base de datos:

```sql
CREATE DATABASE mytech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Paso 3: Configurar y ejecutar el Backend (Laravel)

```bash
# Entrar a la carpeta del backend
cd proyecti-ucompe-backend

# Instalar dependencias de PHP
composer install

# Copiar archivo de configuracion (si no existe .env)
cp .env.example .env

# Generar clave de la aplicacion
php artisan key:generate
```

Editar el archivo `.env` con los datos de tu base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mytech_db
DB_USERNAME=root
DB_PASSWORD=
```

Ejecutar migraciones y seeders para crear las tablas y datos iniciales:

```bash
php artisan migrate --seed
```

Iniciar el servidor de desarrollo del backend:

```bash
php artisan serve
```

> El backend quedara corriendo en **http://localhost:8000**

### Paso 4: Configurar y ejecutar el Frontend (Angular)

Abrir una **nueva terminal** (dejar el backend corriendo):

```bash
# Entrar a la carpeta del frontend
cd proyecto-ucompensar-mytech

# Instalar dependencias de Node.js
npm install

# Iniciar el servidor de desarrollo
npm start
```

> El frontend quedara corriendo en **http://localhost:4200**

### Paso 5: Verificar que todo funciona

1. Abrir **http://localhost:4200** en el navegador
2. La pagina debe cargar los servicios, proyectos y estadisticas desde la API
3. El formulario de contacto debe enviar datos al backend
4. Verificar en la consola del navegador (F12) que no hay errores de CORS o API

### Usuario administrador por defecto

El seeder crea un usuario administrador para acceder a los endpoints protegidos:

| Campo | Valor |
|-------|-------|
| Email | `admin@mytech.com` |
| Password | `password` |

---

## Arquitectura del Proyecto

### Patron Arquitectonico: Cliente-Servidor (SPA + API REST)

El proyecto sigue una arquitectura **cliente-servidor desacoplada** donde el frontend y el backend son aplicaciones independientes que se comunican exclusivamente a traves de una API REST con formato JSON.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USUARIO (Navegador)                         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Angular 20)                          │
│                     http://localhost:4200                           │
│                                                                     │
│  ┌──────────┐    ┌───────────┐    ┌────────────────┐               │
│  │  Rutas   │───>│  Paginas  │───>│  Componentes   │               │
│  │ (Router) │    │  (Pages)  │    │  Reutilizables │               │
│  └──────────┘    └───────────┘    └────────────────┘               │
│                        │                                            │
│                        ▼                                            │
│              ┌──────────────────┐    ┌─────────────────┐           │
│              │    Servicios     │    │   Interceptor    │           │
│              │  (HttpClient)    │◄───│  (Bearer Token)  │           │
│              └────────┬─────────┘    └─────────────────┘           │
└───────────────────────┼─────────────────────────────────────────────┘
                        │ HTTP (JSON)
                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND (Laravel 12)                          │
│                     http://localhost:8000                           │
│                                                                     │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  Rutas   │───>│ Controladores│───>│   Modelos     │              │
│  │ (api.php)│    │   (Api/)     │    │  (Eloquent)   │              │
│  └──────────┘    └──────────────┘    └──────┬───────┘              │
│                                              │                      │
│  ┌──────────────┐    ┌───────────┐           │                      │
│  │   Sanctum    │    │   CORS    │           │                      │
│  │ (Auth Token) │    │ Middleware │           │                      │
│  └──────────────┘    └───────────┘           │                      │
└──────────────────────────────────────────────┼──────────────────────┘
                                               │
                                               ▼
                                    ┌────────────────────┐
                                    │   MySQL 8.x        │
                                    │   mytech_db        │
                                    │   11 tablas         │
                                    │   6 relaciones      │
                                    │   4 FK + 1 pivot    │
                                    └────────────────────┘
```

### Flujo de datos detallado

1. El **usuario** accede a `http://localhost:4200` desde el navegador
2. **Angular** (SPA) carga la aplicacion completa en el navegador
3. El **Router** de Angular determina que pagina mostrar segun la URL
4. Cada **pagina** compone multiples **componentes** reutilizables
5. Los componentes llaman a **servicios** Angular que hacen peticiones HTTP a la API
6. El **interceptor** agrega automaticamente el token de autenticacion a cada peticion
7. La peticion llega al **backend Laravel** en `localhost:8000`
8. Laravel valida la ruta, ejecuta el **middleware** (CORS, Sanctum)
9. El **controlador** procesa la logica y consulta la base de datos via **Eloquent ORM**
10. Eloquent resuelve las **relaciones FK** (BelongsTo, HasMany, BelongsToMany) automaticamente
11. El backend responde con JSON en formato `{ success, message, data }`
12. Angular recibe los datos y actualiza la vista del componente

### Capas del Frontend (Angular)

| Capa | Responsabilidad | Ejemplo |
|------|----------------|---------|
| **Rutas** | Navegacion SPA entre paginas | `app.routes.ts` define 3 rutas: `/`, `/portafolio`, `/contacto` |
| **Paginas** | Composicion de componentes por vista | `HomeComponent` combina Hero + Servicios + Portafolio |
| **Componentes** | UI reutilizable con logica propia | `ServiciosComponent` muestra tarjetas de servicios |
| **Servicios** | Comunicacion HTTP con la API | `ServicioService` obtiene datos de `/api/servicios` |
| **Interceptor** | Inyeccion automatica de auth token | `authInterceptor` agrega `Bearer token` a las peticiones |
| **Modelos** | Interfaces TypeScript para tipado | `Servicio`, `Proyecto`, `Estadistica`, `Contacto` |

### Capas del Backend (Laravel)

| Capa | Responsabilidad | Ejemplo |
|------|----------------|---------|
| **Rutas** | Definicion de endpoints API | `routes/api.php` con rutas publicas y protegidas |
| **Middleware** | Filtrado de peticiones | Sanctum verifica tokens, CORS permite origenes cruzados |
| **Controladores** | Logica de negocio y validacion | `ServicioController` valida datos y retorna respuestas JSON |
| **Modelos** | Representacion de tablas + relaciones | `Proyecto.php` con BelongsTo(Categoria), BelongsToMany(Tecnologia) |
| **Migraciones** | Esquema de base de datos versionado | `create_proyecto_tecnologia_table.php` define tabla pivot N:N |
| **Seeders** | Datos iniciales (15+ registros/tabla) | `ProyectoSeeder` inserta 15 proyectos con FK y relaciones pivot |

### Patrones de diseno aplicados

- **MVC (Model-View-Controller)**: Laravel sigue este patron con Modelos Eloquent, Controladores API y Vistas JSON
- **SPA (Single Page Application)**: Angular carga una sola vez y navega sin recargar la pagina
- **Standalone Components**: Angular 20 sin NgModules, cada componente es independiente y auto-contenido
- **Repository Pattern (implicito)**: Eloquent ORM abstrae el acceso a datos de la logica de negocio
- **Interceptor Pattern**: El interceptor HTTP inyecta credenciales de forma transparente
- **RESTful API**: Endpoints siguen convenciones REST (GET, POST, PUT, DELETE)
- **Token-based Auth**: Sanctum genera tokens stateless para autenticar peticiones API
- **Eager Loading**: Controladores usan `with()` y `withCount()` para cargar relaciones sin N+1

---

## Estructura de Carpetas

```
u.compensar-mytech/
│
├── proyecto-ucompensar-mytech/          # FRONTEND (Angular 20)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/              # Componentes reutilizables
│   │   │   │   ├── header/              # Barra de navegacion responsive
│   │   │   │   ├── hero/                # Seccion principal con estadisticas
│   │   │   │   ├── servicios/           # Tarjetas de servicios + tecnologias
│   │   │   │   ├── portafolio/          # Galeria de proyectos
│   │   │   │   ├── contacto/            # Formulario de contacto con validacion
│   │   │   │   └── footer/              # Pie de pagina
│   │   │   ├── pages/                   # Paginas (composicion de componentes)
│   │   │   │   ├── home/                # Pagina inicio (Hero + Servicios + Portafolio)
│   │   │   │   ├── portafolio-page/     # Pagina completa de portafolio
│   │   │   │   └── contacto-page/       # Pagina de contacto
│   │   │   ├── services/                # Servicios HTTP
│   │   │   │   ├── auth.service.ts      # Login, register, logout, token
│   │   │   │   ├── contacto.service.ts  # Enviar formulario de contacto
│   │   │   │   ├── servicio.service.ts  # Obtener servicios de la API
│   │   │   │   ├── proyecto.service.ts  # Obtener proyectos de la API
│   │   │   │   ├── tecnologia.service.ts# Obtener tecnologias de la API
│   │   │   │   └── estadistica.service.ts# Obtener estadisticas de la API
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts  # Inyecta Bearer Token automaticamente
│   │   │   ├── app.routes.ts            # Definicion de rutas
│   │   │   ├── app.config.ts            # Configuracion (providers, interceptor)
│   │   │   └── app.ts                   # Componente raiz
│   │   ├── environments/
│   │   │   └── environment.ts           # URL base de la API
│   │   ├── styles/
│   │   │   ├── utils/
│   │   │   │   ├── _variables.scss      # Variables SCSS (colores, tipografia, espaciado)
│   │   │   │   └── _mixins.scss         # Mixins reutilizables (responsive, animaciones)
│   │   │   ├── base/
│   │   │   │   ├── _base.scss           # Estilos globales, grid, botones
│   │   │   │   └── _animations.scss     # Animaciones keyframes
│   │   │   └── styles.scss              # Archivo principal (imports)
│   │   └── index.html                   # HTML raiz
│   ├── package.json                     # Dependencias Node.js
│   └── angular.json                     # Configuracion Angular CLI
│
├── proyecti-ucompe-backend/             # BACKEND (Laravel 12)
│   ├── app/
│   │   ├── Http/Controllers/Api/        # Controladores de la API
│   │   │   ├── AuthController.php       # Register, Login, Logout
│   │   │   ├── ContactoController.php   # CRUD Contactos (con relaciones estado, user)
│   │   │   ├── ServicioController.php   # CRUD Servicios
│   │   │   ├── ProyectoController.php   # CRUD Proyectos (con relacion categoria)
│   │   │   ├── TecnologiaController.php # CRUD Tecnologias
│   │   │   ├── EstadisticaController.php# CRUD Estadisticas
│   │   │   ├── CategoriaController.php  # CRUD Categorias (con conteo proyectos)
│   │   │   └── EstadoContactoController.php # CRUD Estados de contacto
│   │   └── Models/                      # Modelos Eloquent con relaciones
│   │       ├── User.php                 # HasApiTokens + HasMany(contactos)
│   │       ├── Contacto.php             # BelongsTo(Estado) + BelongsTo(User)
│   │       ├── Servicio.php             # JSON cast: caracteristicas
│   │       ├── Proyecto.php             # BelongsTo(Categoria) + BelongsToMany(Tecnologia)
│   │       ├── Tecnologia.php           # BelongsToMany(Proyecto) via pivot
│   │       ├── Estadistica.php          # Independiente
│   │       ├── Categoria.php            # HasMany(Proyecto)
│   │       └── EstadoContacto.php       # HasMany(Contacto)
│   ├── database/
│   │   ├── migrations/                  # 15 archivos de migracion
│   │   │   ├── ..._create_categorias_table.php
│   │   │   ├── ..._create_estados_contacto_table.php
│   │   │   ├── ..._create_proyecto_tecnologia_table.php  # Tabla pivot N:N
│   │   │   ├── ..._add_categoria_id_to_proyectos_table.php  # FK
│   │   │   └── ..._add_estado_and_user_to_contactos_table.php  # FK
│   │   └── seeders/                     # 7 seeders (15+ registros c/u)
│   │       ├── UserSeeder.php           # 1 admin
│   │       ├── CategoriaSeeder.php      # 6 categorias
│   │       ├── EstadoContactoSeeder.php # 4 estados
│   │       ├── TecnologiaSeeder.php     # 18 tecnologias
│   │       ├── ServicioSeeder.php       # 15 servicios
│   │       ├── ProyectoSeeder.php       # 15 proyectos (con FK + pivot)
│   │       └── EstadisticaSeeder.php    # 15 estadisticas
│   ├── routes/
│   │   └── api.php                      # 35+ endpoints API
│   ├── config/
│   │   ├── cors.php                     # CORS: permite localhost:4200
│   │   └── sanctum.php                  # Configuracion Sanctum
│   └── .env                             # Variables de entorno
│
├── diagrama-base-datos.html             # MER interactivo (descarga PDF)
├── diagrama-base-datos.puml             # Diagrama en PlantUML
├── diagrama-base-datos.txt              # Diagrama en texto ASCII
```

---

## Base de Datos (MER)

Motor: **MySQL 8.x** | ORM: **Laravel Eloquent** | Charset: **utf8mb4_unicode_ci**

### Modelo Entidad-Relacion

El diagrama MER completo con todos los atributos, tipos de datos, cardinalidad y colores por relacion esta disponible en `diagrama-base-datos.html` (descargable como PDF).

```
                              ┌──────────┐
                              │  USERS   │
                              └─┬───┬──┬─┘
                             1/ 1│   │1 \1
                         ┌───┘   │   │   └───┐
                         ▼       │   │       ▼
                    ◇ tiene ◇    │   │  ◇ tiene ◇
                         │       │   │       │
                        N│       │   │      N│
                         ▼       │   │       ▼
               ┌──────────┐     │   │    ┌──────────────────────┐
               │ SESSIONS │     │   │    │ PERSONAL_ACCESS_TOKENS│
               └──────────┘     │   │    └──────────────────────┘
                                │   │
                           ◇ asigna ◇
                                │
                               N│
                                ▼
  ┌────────────────┐      ┌──────────┐
  │ESTADOS_CONTACTO│─1:N─>│CONTACTOS │
  └────────────────┘      └──────────┘

  ┌────────────┐     ┌───────────┐     ┌─────────────┐
  │ CATEGORIAS │─1:N─│ PROYECTOS │─N:N─│ TECNOLOGIAS │
  └────────────┘     └───────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │ PROYECTO_   │  (tabla pivot)
                    │ TECNOLOGIA  │
                    └─────────────┘

  ┌───────────┐     ┌──────────────┐
  │ SERVICIOS │     │ ESTADISTICAS │    (entidades independientes)
  └───────────┘     └──────────────┘
```

### Tablas (11 en total)

| Tabla | Registros | Descripcion | Relaciones |
|-------|-----------|------------|------------|
| `users` | 1 | Usuarios admin del sistema | 1:N sessions, tokens, contactos |
| `sessions` | - | Sesiones de usuario | FK → users |
| `personal_access_tokens` | - | Tokens Sanctum | FK → users (polymorphic) |
| `categorias` | 6 | Categorias de proyectos | 1:N → proyectos |
| `estados_contacto` | 4 | Estados de gestion de contactos | 1:N → contactos |
| `contactos` | - | Mensajes del formulario | FK → estados_contacto, FK → users |
| `servicios` | 15 | Servicios que ofrece la empresa | Independiente |
| `proyectos` | 15 | Portafolio de proyectos | FK → categorias, N:N → tecnologias |
| `proyecto_tecnologia` | ~45 | Tabla pivot N:N | FK → proyectos, FK → tecnologias |
| `tecnologias` | 18 | Logos de tecnologias | N:N → proyectos (via pivot) |
| `estadisticas` | 15 | Numeros destacados del hero | Independiente |

---

## Relaciones de la Base de Datos

### Relaciones 1:N (uno a muchos)

| Padre | Hijo | FK | Comportamiento |
|-------|------|------|---------------|
| `categorias` | `proyectos` | `categoria_id` | `ON DELETE SET NULL` — si se elimina una categoria, los proyectos quedan sin categoria |
| `estados_contacto` | `contactos` | `estado_id` | `ON DELETE SET NULL` — si se elimina un estado, los contactos pierden el estado |
| `users` | `contactos` | `user_id` | `ON DELETE SET NULL` — asignacion de responsable al contacto |
| `users` | `sessions` | `user_id` | Relacion nativa de Laravel |
| `users` | `personal_access_tokens` | `tokenable_id` | Relacion polimorfica de Sanctum |

### Relacion N:N (muchos a muchos)

| Tabla A | Tabla B | Tabla Pivot | Constraint |
|---------|---------|-------------|------------|
| `proyectos` | `tecnologias` | `proyecto_tecnologia` | `UNIQUE(proyecto_id, tecnologia_id)` + `ON DELETE CASCADE` |

Un proyecto puede usar muchas tecnologias, y una tecnologia puede estar en muchos proyectos. La tabla pivot `proyecto_tecnologia` materializa esta relacion con dos FK y un constraint UNIQUE que impide duplicados.

### Modelos Eloquent y sus relaciones

```php
// Proyecto.php
public function categoriaRelacion(): BelongsTo
    → $this->belongsTo(Categoria::class, 'categoria_id')

public function tecnologiasRelacion(): BelongsToMany
    → $this->belongsToMany(Tecnologia::class, 'proyecto_tecnologia')

// Contacto.php
public function estado(): BelongsTo
    → $this->belongsTo(EstadoContacto::class, 'estado_id')

public function asignadoA(): BelongsTo
    → $this->belongsTo(User::class, 'user_id')

// Categoria.php
public function proyectos(): HasMany
    → $this->hasMany(Proyecto::class)

// EstadoContacto.php
public function contactos(): HasMany
    → $this->hasMany(Contacto::class, 'estado_id')

// Tecnologia.php
public function proyectos(): BelongsToMany
    → $this->belongsToMany(Proyecto::class, 'proyecto_tecnologia')

// User.php
public function contactosAsignados(): HasMany
    → $this->hasMany(Contacto::class, 'user_id')
```

---

## Endpoints de la API

Base URL: `http://localhost:8000/api`

### Endpoints publicos (sin autenticacion)

| Metodo | Endpoint | Descripcion |
|--------|----------|------------|
| `POST` | `/api/register` | Registrar nuevo usuario |
| `POST` | `/api/login` | Iniciar sesion (retorna token) |
| `POST` | `/api/contactos` | Enviar mensaje de contacto (asigna estado "Nuevo" automaticamente) |
| `GET` | `/api/servicios` | Listar servicios activos |
| `GET` | `/api/servicios/{id}` | Ver un servicio |
| `GET` | `/api/proyectos` | Listar proyectos activos |
| `GET` | `/api/proyectos/{id}` | Ver un proyecto |
| `GET` | `/api/tecnologias` | Listar tecnologias activas |
| `GET` | `/api/estadisticas` | Listar estadisticas activas |
| `GET` | `/api/categorias` | Listar categorias (con conteo de proyectos) |
| `GET` | `/api/categorias/{id}` | Ver una categoria |

### Endpoints protegidos (requieren Bearer Token)

| Metodo | Endpoint | Descripcion |
|--------|----------|------------|
| `POST` | `/api/logout` | Cerrar sesion |
| `GET` | `/api/user` | Obtener usuario autenticado |
| **Contactos** | | |
| `GET` | `/api/contactos` | Listar contactos (con estado y responsable) |
| `GET` | `/api/contactos/{id}` | Ver contacto con relaciones |
| `PUT` | `/api/contactos/{id}` | Actualizar contacto (asignar estado/responsable) |
| `DELETE` | `/api/contactos/{id}` | Eliminar contacto |
| **Servicios** | | |
| `POST` | `/api/servicios` | Crear servicio |
| `PUT` | `/api/servicios/{id}` | Editar servicio |
| `DELETE` | `/api/servicios/{id}` | Eliminar servicio |
| **Proyectos** | | |
| `POST` | `/api/proyectos` | Crear proyecto |
| `PUT` | `/api/proyectos/{id}` | Editar proyecto |
| `DELETE` | `/api/proyectos/{id}` | Eliminar proyecto |
| **Tecnologias** | | |
| `GET` | `/api/tecnologias/{id}` | Ver una tecnologia |
| `POST` | `/api/tecnologias` | Crear tecnologia |
| `PUT` | `/api/tecnologias/{id}` | Editar tecnologia |
| `DELETE` | `/api/tecnologias/{id}` | Eliminar tecnologia |
| **Estadisticas** | | |
| `GET` | `/api/estadisticas/{id}` | Ver una estadistica |
| `POST` | `/api/estadisticas` | Crear estadistica |
| `PUT` | `/api/estadisticas/{id}` | Editar estadistica |
| `DELETE` | `/api/estadisticas/{id}` | Eliminar estadistica |
| **Categorias** | | |
| `POST` | `/api/categorias` | Crear categoria |
| `PUT` | `/api/categorias/{id}` | Editar categoria |
| `DELETE` | `/api/categorias/{id}` | Eliminar categoria |
| **Estados de Contacto** | | |
| `GET` | `/api/estados-contacto` | Listar estados |
| `POST` | `/api/estados-contacto` | Crear estado |
| `PUT` | `/api/estados-contacto/{id}` | Editar estado |
| `DELETE` | `/api/estados-contacto/{id}` | Eliminar estado |

> **Total: 35+ endpoints** — CRUD completo para todas las entidades

### Formato de respuesta de la API

Todas las respuestas siguen el mismo contrato:

```json
{
  "success": true,
  "message": "Servicios obtenidos exitosamente",
  "data": [ ... ]
}
```

---

## Autenticacion

El sistema usa **Laravel Sanctum** con tokens de acceso personal (Bearer Tokens).

### Flujo de autenticacion

```
1. Usuario envia credenciales
   POST /api/login { email, password }
                    │
                    ▼
2. Laravel valida y genera token
   Response: { success: true, data: { user, token: "5|abc123..." } }
                    │
                    ▼
3. Angular guarda el token en localStorage
   localStorage.setItem('auth_token', token)
                    │
                    ▼
4. Interceptor agrega token a cada peticion HTTP
   Headers: { Authorization: "Bearer 5|abc123..." }
                    │
                    ▼
5. Sanctum valida el token en el backend
   Si es valido → Procesa la peticion
   Si no → Retorna 401 Unauthorized
```

### Ejemplo de uso con cURL

```bash
# 1. Login (obtener token)
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mytech.com","password":"password"}'

# 2. Usar el token para crear un servicio
curl -X POST http://localhost:8000/api/servicios \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nuevo Servicio",
    "descripcion": "Descripcion del servicio",
    "caracteristicas": ["Feature 1", "Feature 2"],
    "orden": 7,
    "activo": true
  }'

# 3. Crear un proyecto con categoria FK
curl -X POST http://localhost:8000/api/proyectos \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nuevo Proyecto",
    "descripcion": "Descripcion",
    "categoria": "E-commerce",
    "categoria_id": 1,
    "tecnologias": ["Angular", "Laravel"],
    "orden": 16
  }'
```

---

## Sistema de Estilos (SCSS)

El frontend utiliza un **sistema de diseno SCSS** con tematica Gaming/Neon.

### Variables principales (`_variables.scss`)

```scss
// Paleta de colores neon
$color-primario: #00f0ff;      // Cyan neon
$color-secundario: #ff00ff;    // Magenta neon
$color-acento: #ffff00;        // Amarillo neon
$color-exito: #00ff88;         // Verde neon

// Fondo oscuro
$color-fondo-claro: #0f172a;
$color-fondo-oscuro: #020617;

// Efectos glow
$glow-cyan: 0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3);
```

### Metodologia BEM

Las clases CSS siguen la convencion **BEM** (Block Element Modifier):

```scss
.servicios {                    // Bloque
  &__tarjeta {                 // Elemento
    &--destacada {             // Modificador
    }
  }
}
```

### Mixins reutilizables (`_mixins.scss`)

```scss
// Responsive con interpolacion
@mixin responsive($breakpoint) {
  @media (min-width: #{$breakpoint}) { @content; }
}

// Centrado flexbox
@mixin flex-centrado {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Animacion de entrada
@mixin animacion-entrada($retraso: 0s) {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards $retraso;
}
```

### Requisitos SCSS cumplidos

| Requisito | Estado | Ubicacion |
|-----------|--------|-----------|
| 5+ Variables Sass | Cumplido | `src/styles/utils/_variables.scss` (30+ variables) |
| Anidacion de selectores | Cumplido | Todos los archivos `.scss` de componentes |
| 2 casos de interpolacion | Cumplido | `src/styles/utils/_mixins.scss` |

---

## Tecnologias Utilizadas

### Frontend

| Tecnologia | Version | Uso |
|-----------|---------|-----|
| **Angular** | 20.3.0 | Framework SPA principal |
| **TypeScript** | 5.9.2 | Lenguaje de programacion tipado |
| **SCSS/Sass** | - | Preprocesador CSS con variables, mixins, anidacion |
| **RxJS** | 7.8.0 | Programacion reactiva (Observables para HTTP) |
| **Angular Router** | 20.3.0 | Navegacion SPA sin recarga |
| **Angular HttpClient** | 20.3.0 | Peticiones HTTP a la API |

### Backend

| Tecnologia | Version | Uso |
|-----------|---------|-----|
| **Laravel** | 12.x | Framework PHP para API REST |
| **PHP** | 8.2+ | Lenguaje del backend |
| **Laravel Sanctum** | 4.x | Autenticacion por tokens (Bearer) |
| **Eloquent ORM** | - | Mapeo objeto-relacional con relaciones FK |
| **MySQL** | 8.x | Motor de base de datos relacional |

### Herramientas

| Herramienta | Uso |
|-------------|-----|
| **Git** | Control de versiones |
| **Composer** | Gestor de dependencias PHP |
| **npm** | Gestor de dependencias Node.js |
| **Angular CLI** | Herramienta de linea de comandos para Angular |
| **Artisan CLI** | Herramienta de linea de comandos para Laravel |

---

## Despliegue

### Entorno de desarrollo local

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend (Angular) | http://localhost:4200 | 4200 |
| Backend (Laravel) | http://localhost:8000 | 8000 |
| MySQL | localhost | 3306 |

### Comandos utiles

**Frontend:**

```bash
cd proyecto-ucompensar-mytech
npm start              # Servidor de desarrollo (localhost:4200)
npm run build          # Compilar para produccion (carpeta dist/)
npm test               # Ejecutar tests unitarios
```

**Backend:**

```bash
cd proyecti-ucompe-backend
php artisan serve              # Servidor de desarrollo (localhost:8000)
php artisan migrate --seed     # Crear tablas + datos iniciales
php artisan migrate:fresh --seed  # Recrear tablas desde cero
php artisan route:list         # Ver todos los endpoints registrados
```

---

Desarrollado para **Desarrollo de Software Web** — **UCompensar** (Compensar)

---
