import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

//UI
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.css',
})
export class NewUserFormComponent {
  newUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.newUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const newUser: User = this.newUserForm.value as User;
    console.warn("S'ha registrat l'usuari: ", newUser);

    this.userService.addUsers(newUser).subscribe({
      next: (v) => {
        console.log('Resposta del servidor:', v);
        formDirective.resetForm();

        alert("S'ha registrat l'usuari exitosament");
      },
      error: (e) => {
        console.error('Error enviant usuari:', e);
      },
      complete: () => {
        console.info('complete');
      },
    });
  }
}
