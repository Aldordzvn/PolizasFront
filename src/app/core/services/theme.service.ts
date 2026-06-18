import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  // signal en lugar de BehaviorSubject — más simple para un valor de UI puro
  isDark = signal<boolean>(this.obtenerTemaInicial());

  constructor() {
    this.aplicarTema(this.isDark());
  }

  toggleTheme() {
    const nuevoValor = !this.isDark();
    this.isDark.set(nuevoValor);
    this.aplicarTema(nuevoValor);
    localStorage.setItem(this.STORAGE_KEY, nuevoValor ? 'dark' : 'light');
  }

  private obtenerTemaInicial(): boolean {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    if (guardado) return guardado === 'dark';

    // Si no hay preferencia guardada, respeta el sistema operativo
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private aplicarTema(esOscuro: boolean) {
    document.documentElement.classList.toggle('dark', esOscuro);
  }
}