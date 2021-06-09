import {Component, NgModule} from '@angular/core';

@Component({
  selector: 'plugins-plugin-1',
  template: 'Plugin 1 works'
})
export class Plugin1Component {
}

@NgModule({
  declarations: [Plugin1Component],
  exports: [Plugin1Component],
  entryComponents: [Plugin1Component],
})
export class Plugin1Module {}