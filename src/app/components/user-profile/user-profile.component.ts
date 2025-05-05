import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //Només s'injecta al constructor
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  userId: string = '';
  user: User | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.userService.getUsers().subscribe(users => {
          this.user = users.find(u => u.id === id);
        });
      }
    });
  }


}
