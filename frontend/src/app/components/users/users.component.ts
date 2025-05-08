import { Component, OnInit, ViewChild } from '@angular/core'; //ViewChild és necessari pel sort i el paginator
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; //Només s'injecta al constructor
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

//Extres - Filtre, ordenació, paginació
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

//Extres baixar pdf i excel
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

//UI
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule, MatButtonModule],
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

  //Funció per filtrar usuaris
  //https://stackoverflow.com/questions/68559997/angular-material-table-applyfilter-method
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  //Funció per exportar el json a pdf
  //https://github.com/simonbengtsson/jsPDF-AutoTable
  exportPDF() {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['Nom', 'Cognoms', 'Email', 'DNI']],
      body: this.users.data.map(user => [user.name, user.surname, user.email, user.id]),
    });

    doc.save('usuaris.pdf');
  }

  //Funció per exportar el json a excel
  //https://docs.sheetjs.com/docs/getting-started/examples/export/
  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users.data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuaris');
    XLSX.writeFile(workbook, 'usuaris.xlsx');
  }

  //Funció per navegar fins a la ruta /user_profile
  goToProfile(id: string) {
    this.router.navigate(['/user_profile', id]);
  }
}