import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    if (group.get('password')?.value !== group.get('confirmPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const { username, email, password, confirmPassword } = this.registroForm.value;
      this.authService.register(username, email, password, confirmPassword);
    }
  }
}
