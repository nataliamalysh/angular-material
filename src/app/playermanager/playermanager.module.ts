import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayermanagerAppComponent } from './playermanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './components/notes/notes.component';
import { AddContactDialogComponent } from './components/add-contact-dialog/add-contact-dialog.component';

const routes: Routes = [
  {
    path: '', component: PlayermanagerAppComponent,
    children: [
      { path: ':id', component:  MainContentComponent},
      { path: '', component:  MainContentComponent}
    ] 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [PlayermanagerAppComponent, ToolbarComponent, MainContentComponent, SidenavComponent, NotesComponent, AddContactDialogComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ]
})
export class PlayermanagerModule { }
