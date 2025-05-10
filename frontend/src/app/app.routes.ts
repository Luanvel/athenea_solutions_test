import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'newuser_form', component: NewUserFormComponent },
  { path: 'user_profile/:id', component: UserProfileComponent },
];
