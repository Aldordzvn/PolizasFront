import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-aside-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})
export class AsideMenuComponent {
  
}
