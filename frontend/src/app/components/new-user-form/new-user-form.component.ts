import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.css'
})
export class NewUserFormComponent {

  newUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.newUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const newUser: User = this.newUserForm.value as User;
    console.warn('S\'ha registrat l\'usuari: ', newUser);

    this.userService.addUsers(newUser).subscribe({
      next: (v) => {
        console.log('Resposta del servidor:', v);
        this.newUserForm.reset();
      },
      error: (e) => {
        console.error('Error enviant usuari:', e);
      },
      complete: () => {
        console.info('complete')
      }
    });
  }

}
