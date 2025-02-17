import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'signin-or-dashboard-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container
      *ngIf="type === 'navLink'; then navLinkRef; else actionButtonRef"
    >
    </ng-container>

    <ng-template #navLinkRef>
      <a *ngIf="signInOrDashboard === 'sign-in'" routerLink="/sign-in">
        Sign In
      </a>
      <a
        *ngIf="signInOrDashboard === 'dashboard'"
        routerLink="/dashboard"
        class="flex items-center gap-1"
      >
        <img
          src="assets/OnIcon.png"
          class="max-w-[20px]"
          alt="On Icon"
          width="20px"
          height="20px"
        />
        {{ currentUserName }}
      </a>
    </ng-template>

    <ng-template #actionButtonRef>
      <a
        *ngIf="signInOrDashboard === 'sign-in'"
        role="button"
        routerLink="/sign-in"
        [class]="actionButtonClass"
      >
        Sign In
      </a>
      <a
        *ngIf="signInOrDashboard === 'dashboard'"
        routerLink="/dashboard"
        [class]="actionButtonClass"
      >
        Go To Dashboard
      </a>
    </ng-template>
  `,
})
export class SigninOrDashboardLinkComponent {
  @Input() signInOrDashboard: 'sign-in' | 'dashboard' = 'sign-in';
  @Input() type: 'navLink' | 'actionButton' = 'navLink';

  currentUserName = '';
  actionButtonClass =
    'bg-secondary inline-block rounded-sm px-8 py-2 text-sm text-white mt-8 lg:mt-12 lg:text-base hover:bg-secondary/80';


  private currentUserSubscription!: Subscription;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.currentUserSubscription = this.authService
      .onCurrentUser()
      .subscribe((currentUser) => {
        if (currentUser) {
          this.signInOrDashboard = 'dashboard';
          this.currentUserName = currentUser.name;
        } else {
          this.signInOrDashboard = 'sign-in';
        }
      });
  }
  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
}
