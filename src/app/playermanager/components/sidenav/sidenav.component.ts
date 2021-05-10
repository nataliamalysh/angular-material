import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean;

  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  isNeutralTheme = false;
  isLightTheme = false;
  dir: string = 'ltr';

  constructor(
    public breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
    ) { }

  @ViewChild('sidenav') sidenav: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  neutralTheme(event) {
    console.log("THEME", event);
    if (event == 'NEUTRAL-THEME') {
      this.isNeutralTheme = true;
      this.isDarkTheme = false;
      this.isLightTheme = false;
    } else if (event == 'BLACK-THEME') {
      this.isNeutralTheme = false;
      this.isDarkTheme = true;
      this.isLightTheme = false;
    } else if (event == 'LIGHT-THEME') {
      this.isNeutralTheme = false;
      this.isDarkTheme = false;
      this.isLightTheme = true;
    }
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr'; 
  }

  ngOnInit(): void {
    this.breakpointObserver
      // .observe([ Breakpoints.XSmall ])
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

      this.users = this.userService.users;
      this.userService.loadAll();

      this.router.events.subscribe(() => {
        if (this.isScreenSmall) {
          this.sidenav.close();
        }
      })
  }

}
