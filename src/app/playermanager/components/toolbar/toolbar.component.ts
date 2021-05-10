import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() addNewTheme = new EventEmitter<string>();
  @Output() toggleDir = new EventEmitter<void>();

  selectedTheme: any;
  themes = [
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NEUTRAL-THEME', label: 'neutral' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.selectedTheme = this.themes[0].value;
    console.log("Selected", this.selectedTheme)
  }

  addNewItem(value: string) {
    console.log("!! THEME", value);
    this.addNewTheme.emit(value);
  }
  openAddContactDialog(): void {
    let dialogRef = this.dialog.open(AddContactDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)

      if (result) {
        this.openSnackBar("Contact added", "Navigate")
          .onAction().subscribe(() => {
              this.router.navigate(['/contactmanager', result.id]);
          });
      }
    })
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
