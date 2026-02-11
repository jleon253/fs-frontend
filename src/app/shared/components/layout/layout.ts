import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';

import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { UiService } from '../../../core/services/ui.service';

const LAYOUT_ICONS = { };

@Component({
  selector: 'app-layout',
  imports: [Header, RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  providers: [provideIcons(LAYOUT_ICONS)],
})
export class Layout {
  public uiService = inject(UiService);
}
