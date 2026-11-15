import { Injectable, signal } from '@angular/core';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import { environment } from '../../../environments/environment';

const app = getApps().length ? getApp() : initializeApp(environment.firebase);
const auth = getAuth(app);

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** The currently signed-in user, or null. */
  user = signal<User | null>(null);

  /** True once Firebase has reported the initial auth state. */
  ready = signal(false);

  constructor() {
    onAuthStateChanged(auth, (u) => {
      this.user.set(u);
      this.ready.set(true);
    });
  }

  /**
   * Waits for Firebase to restore any saved session, then returns the user (or null).
   * Used by route guards so a page refresh doesn't bounce a logged-in user to /login.
   */
  async getCurrentUser(): Promise<User | null> {
    await auth.authStateReady();
    return auth.currentUser;
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  async signInWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    return result.user;
  }

  sendPasswordReset(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  logout(): Promise<void> {
    return signOut(auth);
  }
}