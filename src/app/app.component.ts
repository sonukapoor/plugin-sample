import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentRef,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SystemJS } from 'utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private componentRef: ComponentRef<any>;

  @ViewChild('viewContainer', { static: true, read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  constructor(
    private readonly compiler: Compiler,
    private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.loadModule();
  }

  private async loadModule() {
    try {
      const result = await SystemJS.import('assets/plugins/my-plugin.js');
      const compiled = await this.compiler.compileModuleAndAllComponentsAsync(
        result['PluginsModule']
      );

      const moduleRef = compiled.ngModuleFactory.create(this.injector);
      const modCompRef = compiled.componentFactories.find(
        (component) => component.selector === 'lib-plugins'
      );

      const compFactory =
        moduleRef.componentFactoryResolver.resolveComponentFactory(
          modCompRef.componentType
        );

      this.insertComponent(compFactory);
    } catch (err) {
      console.log('Could not load module', err);
    }
  }

  private insertComponent(factory: ComponentFactory<any>) {
    this.componentRef = this.viewContainer.createComponent(factory);
  }
}
