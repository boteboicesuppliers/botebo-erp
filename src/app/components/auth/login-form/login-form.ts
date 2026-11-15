import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth';
import { ResetPasswordForm } from '../reset-password-form/reset-password-form';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, ResetPasswordForm],
  templateUrl: './login-form.html',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  showReset = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const { email, password } = this.form.getRawValue();
      await this.auth.signInWithEmail(email.trim(), password);
      this.router.navigate(['/dashboard']); // change to your post-login route
    } catch (e: any) {
      this.error.set(this.toMessage(e?.code));
    } finally {
      this.loading.set(false);
    }
  }

  async onGoogle() {
    this.loading.set(true);
    this.error.set(null);

    try {
      await this.auth.signInWithGoogle();
      this.router.navigate(['/dashboard']); // change to your post-login route
    } catch (e: any) {
      if (e?.code !== 'auth/popup-closed-by-user') {
        this.error.set(this.toMessage(e?.code));
      }
    } finally {
      this.loading.set(false);
    }
  }

  private toMessage(code?: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Incorrect email or password.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}