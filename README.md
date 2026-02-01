# SGRA - Autenticación JWT (Local)

## Backend (Spring Boot)

1. Configura las variables de entorno o crea un archivo **no versionado** `Backend/src/main/resources/application-local.properties` con:
   - `spring.datasource.username=sgra_app`
   - `spring.datasource.password=#12345`
   - (opcional) `spring.datasource.url=jdbc:postgresql://localhost:5432/SGRA`
2. Ejecuta:
   ```bash
   cd Backend
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
   ```

> Nota: El JWT usa `SGRA_JWT_SECRET` si está definido. Para local puedes exportarlo antes de ejecutar el backend.

## Frontend (Angular)

1. Instala dependencias:
   ```bash
   cd Frontend
   npm install
   ```
2. Ejecuta:
   ```bash
   npm start
   ```

El frontend consume `/api/auth/login` y adjunta el JWT en `/api/**`. Para desarrollo, el proxy (proxy.conf.json) redirige `/api` a `http://localhost:8080`.
