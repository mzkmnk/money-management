import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { BackOnHeaderComponent } from 'src/app/components/back-on-header/back-on-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FloatingButtonComponent,
    BackOnHeaderComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderComponent, FloatingButtonComponent, BackOnHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppCommonModule {}
