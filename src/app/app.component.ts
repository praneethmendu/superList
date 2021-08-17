import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'opinion';
  selectedLang = 'en';
  constructor(private translateService: TranslateService) {}

  updateLang(event: any) {
    this.translateService.use(event.target.value);
  }
}
