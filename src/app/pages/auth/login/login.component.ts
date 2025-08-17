import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loading = false;

  // ✅ Strictly typed FormGroup
  form!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control<string | null>('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control<string | null>('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Mock login (replace with API later)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert('Login OK (mock)');
    }, 600);
  }

  // ✅ Typed getter, so you can use f.email / f.password in the template
  get f() {
    return this.form.controls;
  }
}