import { Injectable } from '@angular/core';
import { UserRoles } from '../enums/user-roles';
import { AuthService } from './auth.service';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private currentUser!: User | null;

  get isAdmin() {
    return this.isPermitted(UserRoles.Admin);
  }
  get isResearchManager() {
    return this.isPermitted(UserRoles.ResearchManager);
  }
  get isResearchStaff() {
    return this.isPermitted(UserRoles.ResearchStaff);
  }

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  // Checks if user has required roles to access some views
  isPermitted(roleOrRoles: `${UserRoles}` | `${UserRoles}`[]): boolean {
    if (!this.currentUser) return false;
    if (typeof roleOrRoles === 'string') {
      return this.currentUser?.roles.includes(roleOrRoles);
    }
    return roleOrRoles.some((role) => this.currentUser?.roles.includes(role));
  }
}
