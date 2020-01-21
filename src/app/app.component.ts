import { GroupService } from './service/group.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  title = 'AccountX';
  currentUser;
  isAdmin;
  currentYear;
  isLoggedIn = false;
  company;

  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
  }

  ngOnInit() {
    // needs typesafe ('?') parameter in html, because html renders faster then the name of the user is loaded
    this.userService.getCurrentUser().subscribe(
      (response) => {
        this.currentUser = response;
      }
    );

    this.currentYear = new Date().getFullYear().toString();
  }

  ngAfterViewInit() {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });

    //Todo
    // if (this.isLoggedIn) {
    // this.checkIfUserIsAdmin();
    // }
  }

  checkIfUserIsAdmin() {
    this.userService.getCurrentUser().subscribe(
      (response) => {
        // console.log(response);
        const user = JSON.parse(JSON.stringify(response));
        // console.log(user.groups);

        user.groups.forEach((key: string | number) => {

          this.groupService.getGroup(user.groups[0]).subscribe(
            (group) => {
              const groupName = (JSON.parse(JSON.stringify(group)).name);
              // console.log(groupName);
              if (groupName.includes('_admins')) {
                // console.log(true);
                return this.isAdmin = true;
              }
            }
          );

        });
      }
    );
  }

  logout() {
    this.userService.logout();
  }
}
