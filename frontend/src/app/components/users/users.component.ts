import { Component, OnInit, ViewChild } from '@angular/core'; //ViewChild és necessari pel sort i el paginator
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; //Només s'injecta al constructor

//Extres - Filtre, ordenació, paginació
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

//UI
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'surname', 'email', 'id'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users.data = data;  // assignar les dades
      this.users.paginator = this.paginator; // paginació
      this.users.sort = this.sort; // ordenació
    });
  }

  //https://stackoverflow.com/questions/68559997/angular-material-table-applyfilter-method
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  goToProfile(id: string) {
    this.router.navigate(['/user_profile', id]);
  }
}