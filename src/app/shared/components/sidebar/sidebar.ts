import { Component, inject } from '@angular/core';
import {
  bootstrapPeople,
  bootstrapBank2,
  bootstrapWallet2,
  bootstrapPerson,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TitleCasePipe } from '@angular/common';

const SIDEBAR_ICONS = { bootstrapBank2, bootstrapPeople, bootstrapWallet2, bootstrapPerson };

@Component({
  selector: 'app-sidebar',
  imports: [NgIconComponent, RouterLink, RouterLinkActive, TranslatePipe, TitleCasePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  providers: [provideIcons(SIDEBAR_ICONS)],
})
export class Sidebar {
}
