# TechEduPlanet

## Descripción
Aplicación web de actividades educativas para estudiantes de segundo ciclo de educación básica

## Integrantes 
- Hazel Brendaly Granados Ramos (Scrum Master | Frontend Dev)
- Olga Vanessa Sorto Fuentes (Product Owner | Frontend/Backend Dev)
- Diego Alejandro Rodríguez Valencia (Frontend Dev)
- Cristian Yahir Campos Aparicio (Scrum Master | Frontend Dev)
- Rony Josué Sorto Villalta (Tester Lead)
- Lindys Arely Martínez Herrera (Tester)

## Tecnologías Utilizadas

1. Dependencias principales:
- Lenguaje de programación: JavaScript
- Framework back-end: Express ^4.19.2
- Framework front-end: Next.js ^ 14.2.3
- Desarrrollo de juegos: Phaser.js ^ 3.80.1
- Base de datos: MySQL
  
2. Dependencias de desarrollo:
- Diseño: tailwindcss: ^3.4.3

## Documentación Técnica

- [TechEduPlanet]([https://www.notion.so/Techeduplanet-147901da42b4808f9619d99f9c15bc7c?pvs=4](https://marvelous-dove-a2f.notion.site/Documento-T-cnico-TechEduPlanet-147901da42b4808f9619d99f9c15bc7c?pvs=4))

## Instrucciones para ejecutar el proyecto

Tecnologías requeridas: 
- Node js
- Npm (Node Package Manager)
  
Pasos detallados para ejecutar el proyecto en un entorno local:

1. Clonar el repositorio: git clone https://github.com/vane2810/tep.git
2. Cambia al directorio del proyecto: cd tep
3. Instala las dependencias en la terminal:
     npm install

Levantar el servidor de Next.js
1. Cambia el directorio en la terminal: cd next
2. Inicia el servidor: npm run dev
   
Levantar el servidor de Express 
1. Crear una bd en MySQL con el nombre: 'techeduplanet'
2. Crear un archivo en la carpeta raíz llamado .env
3. Dentro del archivo .env escribir: 
          DB_HOST=localhost
          DB_USER=<tu usuario>
          DB_PASSWORD=<tu contraseña>
          DB_NAME=techeduplanet
          DB_DIALECT=mysql
NOTA: Cambiar si es necesario
4. En la terminal:
    - Cambiar de directorio: cd next
    - Ejecutar la migración: npx sequelize-cli db:migrate
      
5. Ejecutar el servidor (manteniendo el servidor de Next.js en ejecución)
    - Cambia el directorio en la terminal: cd next
     - Inicia el servidor: node server.js
