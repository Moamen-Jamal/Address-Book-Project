import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasteradminComponent } from './MasterModules/admin/masteradmin/masteradmin.component';
import { AdminsCrudComponent } from './Adminstration/admins-crud/admins-crud.component';

import { MasterComponent } from './Adminstration/master/master.component';

import { AuthenticationGuard } from './Guards/authentication.guard';
import { HomeComponent } from './home/home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden/forbidden.component';

import { SignInComponent } from './sign-in/sign-in.component';

import { EmployeesCrudComponent } from './Adminstration/employee-crud/employees-crud/employees-crud.component';
import { DepartmentsCrudComponent } from './Adminstration/departments-crud/departments-crud/departments-crud.component';
import { JobsCrudComponent } from './Adminstration/jobs-crud/jobs-crud.component';


const routes: Routes = [
  
  
  {path:'Admin' ,component: MasteradminComponent, canActivate:[AuthenticationGuard] ,
   data: { permittedRoles: ['Admin'] },
  children:[
    {path:'' , component : MasterComponent, canActivate:[AuthenticationGuard] , data: { permittedRoles: ['Admin'] },},
    {path:'AdminHome' ,component:MasterComponent , canActivate:[AuthenticationGuard], data: { permittedRoles: ['Admin'] },},
    {path:'AdminCrud' ,component: AdminsCrudComponent , canActivate:[AuthenticationGuard], data: { permittedRoles: ['Admin'] },},
    {path:'EmployeeCrud' ,component: EmployeesCrudComponent , canActivate:[AuthenticationGuard], data: { permittedRoles: ['Admin'] },},
    {path:'DepartmentCrud' ,component: DepartmentsCrudComponent , canActivate:[AuthenticationGuard], data: { permittedRoles: ['Admin'] },},
    {path:'JobCrud' ,component: JobsCrudComponent , canActivate:[AuthenticationGuard], data: { permittedRoles: ['Admin'] },},
  ] } ,
  { path: 'Login', component: SignInComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  // {
  //   path: '**',
  //   resolve: {
  //     path: PathResolveService
  //   },
  //   component: NotFoundComponent
  // }
  // 

  { path: '', redirectTo: 'Login', pathMatch: 'full' },

  {
    path: 'Home', component: HomeComponent,canActivate:[AuthenticationGuard] ,
    data: { permittedRoles: ['Employee'] }
  },





  //  {path:'Chiefs' ,component:CheifsComponent },
  //  {path:'ChiefsProfile' ,component:CheifsProfileComponent }
  // 
  // {path:'Admin' ,redirectTo :'AdminHome', pathMatch : 'full' },
  // {path:'' ,redirectTo :'Chiefs', pathMatch : 'full' },
  // {path:'Chiefs' ,component: AsideComponent },
  // {path:'ChiefDetails' ,component: CheifDetailsComponent } ,
  // {path:'ChiefProfile' ,component: CheifsProfileComponent } ,
  // {path:'OrderDetails' ,component: OrderDetailsComponent }   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
