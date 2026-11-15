import { Injectable, signal } from '@angular/core';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { environment } from '../../environments/environment';

const app = getApps().length ? getApp() : initializeApp(environment.firebase);
const auth = getAuth(app);

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** The currently signed-in user, or null. */
  user = signal<User | null>(null);

  /** True once Firebase has reported the initial auth state (useful for guards). */
  ready = signal(false);

  constructor() {
    onAuthStateChanged(auth, (u) => {
      this.user.set(u);
      this.ready.set(true);
    });
  }

  async signInWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    return result.user;
  }

  logout(): Promise<void> {
    return signOut(auth);
  }
}