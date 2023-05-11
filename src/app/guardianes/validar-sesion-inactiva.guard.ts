import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

export const ValidarSesionInactivaGuard = () => {
  const seviciosSeguridad = inject(SeguridadService);
  const router = inject(Router);


  let existeSesion = seviciosSeguridad.validacionDeSesion();
    if(existeSesion){
      return false;
    }
    router.navigate(["/ruta-no-encontrada"]);
    return true;
    
}

// @Injectable({
//   providedIn: 'root'
// })
// export class ValidarSesionInactivaGuard implements CanActivate {
//   constructor(
//     private servicioSeguridad: SeguridadService,
//     private router: Router
//   ){
    
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     let existeSesion = this.servicioSeguridad.validacionDeSesion();
//     if(existeSesion){
//       return false;
//     }
//     this.router.navigate(["/inicio"]);
//     return true;
//   }
// }
