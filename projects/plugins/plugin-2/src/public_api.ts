import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'plugins-plugin-2',
  template: 'Plugin 2 works'
})
export class Plugin2Component {
}

@NgModule({
  declarations: [Plugin2Component],
  exports: [Plugin2Component],
  entryComponents: [Plugin2Component],
})
export class Plugin2Module {}