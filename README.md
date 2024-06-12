# TechEduPlanet

## Descripción
Aplicación web orientada a juegos educativos para esudiantes de segundo ciclo de educación básica 

## Integrantes 
- Hazel Brendaly Granados Ramos (SMSS041722)
- Katherine Verenice Fuentes Rivera (SMSS077422)
- Olga Vanessa Sorto Fuentes (SMSS055722)

## Tecnologías Utilizadas

1. Dependencias principales:
- Lenguaje de programación: JavaScript
- Framework back-end: Express ^4.19.2
- Framework front-end: Next.js ^ 14.2.3
- Desarrrollo de videojuegos: Phaser.js ^ 3.80.1
- Base de datos: MySQL
  
2. Dependencias de desarrollo:
- Diseño: tailwindcss: ^3.4.3

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
2. Inicia el servidor:
     npm run dev
   
Levantar el servidor de express (manteniendo el servidor de Next.js en ejecución)
1. Cambia el directorio en la terminal: cd next
2. Inicia el servidor:
     node server.js

Pasos para importar el dump de la base de datos:
1. Crear una base de datos nueva en MySQL llamada: techeduplanet
2. Navega al directorio del proyecto donde se encuentra el archivo 'techeduplanet.sql'
3. Utiliza el siguiente comando en tu terminal para importar el dump de la base de datos:
     mysql -u usuario -p nombre_base_datos < techeduplanet.sql
Nota:
- Reemplaza 'usuario' con tu nombre de usuario de MySQL
- Asegúrate de estar en el mismo directorio donde se encuentra techeduplanet.sql o proporciona la ruta completa al archivo

