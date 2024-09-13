import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { inject } from '@angular/core';
import { RegistersService } from './services/registers/registers.service';
import { ProductosEmpleadoComponent } from './pages/productos-empleado/productos-empleado.component';
import { ControlUsersComponent } from './pages/control-users/control-users.component';

function isRole(role?: String){
  const registerService = inject(RegistersService);
  console.log(registerService.currentRegister?.role);
  return registerService.currentRegister?.role === role;
}


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'products', component: ProductosComponent },

  { path: 'users', component: UsuarioComponent,
    canMatch:[()=>isRole("Admin")],
   },
   { path: 'users', component: UsuarioComponent,
    canMatch:[()=>isRole("Empleado")],
   },
   {
    path:'users',component: LoginComponent,
    canMatch:[()=>isRole()],
  },
//User Admin
  { path: 'user', component: ControlUsersComponent,
    canMatch:[()=>isRole("Admin")],
   },
   {
    path:'user',component: LoginComponent,
    canMatch:[()=>isRole()],
  },

//Productos Empleado
  { path: 'product', component: ProductosEmpleadoComponent,
    canMatch:[()=>isRole("Admin")],
  },

  { path: 'product', component: ProductosEmpleadoComponent,
    canMatch:[()=>isRole("Empleado")],
  },
  {
    path:'product',component: LoginComponent,
    canMatch:[()=>isRole()],
  },

//Productos Admin
  {
    path:'products',component: ProductosComponent,
    canMatch:[()=>isRole("Admin")],
  },
  {
    path:'products',component: LoginComponent,
    canMatch:[()=>isRole()],
  },


];
