import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { BackOnHeaderComponent } from 'src/app/components/back-on-header/back-on-header.component';
import { HistoryListComponent } from 'src/app/components/history-list/history-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FloatingButtonComponent,
    BackOnHeaderComponent,
    HistoryListComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FloatingButtonComponent,
    BackOnHeaderComponent,
    HistoryListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppCommonModule {}
