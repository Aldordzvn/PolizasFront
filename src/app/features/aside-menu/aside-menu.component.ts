import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-aside-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  private authService = inject(AuthService);

  cerrarSesion(){
    this.authService.logout();
  }
}
