import { effect, Injectable, signal } from '@angular/core';

enum ThemeValues {
  Light = 'light',
  Dark = 'dark',
}
type Theme = ThemeValues.Light | ThemeValues.Dark;

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isSidebarOpen = signal(false);
  theme = signal<Theme>(
    (localStorage.getItem('theme') as Theme) || ThemeValues.Light
  );

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      document.documentElement.setAttribute('data-bs-theme', currentTheme);
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }

  toggleTheme() {
    this.theme.update(t => t === ThemeValues.Light ? ThemeValues.Dark : ThemeValues.Light);
  }

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
