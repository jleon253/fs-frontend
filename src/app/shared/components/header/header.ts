import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapList,
  bootstrapMoonFill,
  bootstrapPeople,
  bootstrapPlusCircle,
  bootstrapSunFill,
  bootstrapWallet2,
} from '@ng-icons/bootstrap-icons';

import { UiService } from '../../../core/services/ui.service';

const HEADER_ICONS = {
  bootstrapList,
  bootstrapMoonFill,
  bootstrapPeople,
  bootstrapPlusCircle,
  bootstrapSunFill,
  bootstrapWallet2,
};

@Component({
  selector: 'app-header',
  imports: [NgIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [provideIcons(HEADER_ICONS)],
})
export class Header {
  public uiService = inject(UiService);
}
