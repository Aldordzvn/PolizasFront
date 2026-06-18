import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  template: `
    <button (click)="themeService.toggleTheme()" class="theme-toggle" [attr.aria-label]="themeService.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
      <i class="ti" [class.ti-sun]="themeService.isDark()" [class.ti-moon]="!themeService.isDark()"></i>
    </button>
  `,
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
