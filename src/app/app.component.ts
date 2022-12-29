import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from './custom-validators/password-checker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signup-reactive';

  registerForm : FormGroup = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
    acceptTandC: [false, Validators.requiredTrue]
  }, {
    validators: PasswordChecker('password', 'confirmPassword')
  } as AbstractControlOptions);

  isSubmitted : boolean = false;

  constructor(private formBuilder : FormBuilder) {}

  //a simple get helper
  get h() {
    return this.registerForm.controls;
  }

  submitForm = () => {
    this.isSubmitted = true;

    if(this.registerForm.invalid) {
      //Form is invalid
      return;
    }

    console.table(this.registerForm.value);
    console.table(this.registerForm);

    alert("Success Signup!" + JSON.stringify(this.registerForm.value));
  }

  resetForm = () => {
    this.isSubmitted = false;
    this.registerForm.reset();
  }
}
