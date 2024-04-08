import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';

@NgModule({
  declarations: [HeaderComponent, FloatingButtonComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FloatingButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppCommonModule {}
