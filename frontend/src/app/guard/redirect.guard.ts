import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { ToastrService } from 'ngx-toastr';

export function RedirectGuard(guard: GuardService, router: Router, toast: ToastrService): CanActivateFn {
  return (route, state) => {
    if (guard.isLoggedIn()) {
      return true;
    } else {
      toast.info('Inicie sesion para poder ver el contenido');
      return router.createUrlTree(['/login']);
    }
  };
}

