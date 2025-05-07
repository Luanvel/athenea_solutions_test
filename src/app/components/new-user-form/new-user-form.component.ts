import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-new-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.css'
})
export class NewUserFormComponent {

  newUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.newUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.warn('S\'ha regitrat l\'usuari: ', this.newUserForm.value);
    this.newUserForm.reset()
  }

}
