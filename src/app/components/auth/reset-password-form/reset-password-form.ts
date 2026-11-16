
import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth';

@Component({
  selector: 'app-reset-password-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-form.html',
})
export class ResetPasswordForm {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  /** Emitted when the user wants to return to the login form. */
  back = output<void>();

  loading = signal(false);
  sent = signal(false);
  error = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.auth.sendPasswordReset(this.form.getRawValue().email.trim());
      this.sent.set(true);
    } catch (e: any) {
      this.error.set(this.toMessage(e?.code));
    } finally {
      this.loading.set(false);
    }
  }

  private toMessage(code?: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
