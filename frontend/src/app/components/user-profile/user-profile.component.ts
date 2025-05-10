import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //Només s'injecta al constructor
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RandomUserService } from '../../services/random-user.service';

//UI
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  userId: string = '';
  user: User | undefined;
  userPhoto: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private randomUserService: RandomUserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.userService.getUsers().subscribe((users) => {
          this.user = users.find((user) => user.id === id);
        });

        //Aconseguir la imatge random desde l'API
        const gender = Math.random() < 0.5 ? 'men' : 'women';
        const randomNumber = Math.floor(Math.random() * 99);
        this.userPhoto = `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
      }
    });
  }
}
