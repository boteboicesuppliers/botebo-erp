import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

/** Keeps signed-in users away from /login by sending them to the app instead. */
export const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = await auth.getCurrentUser();
  return user ? router.createUrlTree(['/']) : true;
};