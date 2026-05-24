# Deploy en cPanel - dimitryjacques.com

## Requisitos
- PHP 8.2+
- MySQL 5.7+ / MariaDB 10.3+
- Composer (vía SSH o terminal de cPanel)
- Node.js (opcional, para compilar assets)

## Pasos

### 1. Subir archivos
Sube todo el contenido del proyecto (excepto `.git/`) a tu hosting vía FTP o File Manager.
Estructura recomendada:
```
public_html/         ← apuntar aquí la carpeta public/
├── .htaccess
├── index.php
├── css/
├── js/
└── ...
dimitry/             ← todo lo demás del proyecto
├── app/
├── bootstrap/
├── config/
├── ...
```

### 2. Configurar symlink
En cPanel, crea un **Symlink** (acceso simbólico) desde `public_html/` → `dimitry/public/`.
O simplemente copia el contenido de `public/` dentro de `public_html/`.

### 3. Configurar base de datos
1. Crea una BD en cPanel (MySQL Database Wizard)
2. Copia `.env.example` a `.env`
3. Edita `.env`:
```
DB_DATABASE=tu_base_de_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
APP_URL=https://dimitryjacques.com
```

### 4. Instalar dependencias
```bash
cd dimitry
composer install --no-dev --optimize-autoloader
```

### 5. Generar clave y migrar
```bash
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```

### 6. Optimizar
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 7. Permisos
Asegurar que `storage/` y `bootstrap/cache/` tengan permisos de escritura (755).

### 8. Admin Panel
Accede a `https://dimitryjacques.com/admin`
- Email: `admin@dimitryjacques.com`
- Password: `admin123`
**Cambia la contraseña después del primer login.**

## Estructura del Admin
| Ruta | Descripción |
|------|-------------|
| `/admin` | Dashboard |
| `/admin/projects` | Gestionar proyectos |
| `/admin/news` | Gestionar noticias |
| `/admin/categories` | Categorías de noticias |
| `/admin/tags` | Tags |
| `/admin/contact-messages` | Mensajes de contacto |
