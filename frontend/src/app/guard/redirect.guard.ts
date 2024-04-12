import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';

export function RedirectGuard(guard: GuardService, router: Router): CanActivateFn {
  return (route, state) => {
    if (guard.isLoggedIn()) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  };
}

