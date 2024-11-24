import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export function createLoginForm(fb: FormBuilder): FormGroup {
  return fb.group({
    identification: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
}

export function createRegisterForm(fb: FormBuilder): FormGroup {
  return fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    identification: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
}
