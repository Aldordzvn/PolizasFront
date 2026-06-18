import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { ThemeToggleComponent } from "../../shared/components/theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-aside-menu',
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  private authService = inject(AuthService);

  cerrarSesion(){
    this.authService.logout();
  }
}
