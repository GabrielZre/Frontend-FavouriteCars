import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
    }

    public isLoggedIn() {
        return this.userAuthService.isLoggedIn();
    }

    public logout() {
        this.userAuthService.clear();
        this.router.navigate(['/home']);
    }
}
