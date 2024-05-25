// scripts/initRoles.js
"use strict";
const { Role } = require('../models');



const initRoles = async () => {
  const roles = [
    { name: 'estudiante', description: 'Rol para estudiantes' },
    { name: 'administrador', description: 'Rol para administradores' }
  ];

  for (let role of roles) {
    const [createdRole, created] = await Role.findOrCreate({
      where: { name: role.name },
      defaults: role
    });
    if (created) {
      console.log(`Rol ${role.name} creado.`);
    } else {
      console.log(`Rol ${role.name} ya existe.`);
    }
  }
};

initRoles()
  .then(() => {
    console.log('Roles inicializados');
    process.exit();
  })
  .catch(error => {
    console.error('Error inicializando roles:', error);
    process.exit(1);
  });
