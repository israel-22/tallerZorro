import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { RegistersService } from '../services/registers/registers.service';

export const rolesGuard: CanMatchFn = (route, segments) => {
  const registerService=inject(RegistersService);
  const router= inject(Router);
  const role = registerService.currentRegister?.role;
  const nombreComponent = route.component?.name;

  console.log(role, nombreComponent);

 // Verifica el rol y redirige según el rol del usuario
 if (role === 'Admin') {
  // Si el rol es Admin, redirige al inicio
  router.navigateByUrl('/welcome');
  return false; // Evita que el guard permita la navegación a la ruta actual
}

if (role === 'Empleado' && nombreComponent === '_ProductosEmpleadoComponent') {
  // Si el rol es Empleado y el componente es _ProductosEmpleadoComponent, permite la navegación
  return true;
}

if (!role) {
  // Si no hay rol definido, redirige al login
  router.navigateByUrl('/login');
  return false; // Evita que el guard permita la navegación a la ruta actual
}

// Si el rol no coincide con los casos anteriores, evita la navegación
return false;
};
