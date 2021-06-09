import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private componentRef: ComponentRef<any>|null = null;

  @ViewChild('viewContainer', { static: true, read: ViewContainerRef })
  viewContainer: ViewContainerRef;

  constructor(private readonly resolver: ComponentFactoryResolver) {}

  async loadPlugin1() {
    const {Plugin1Component} = await import('plugins/plugin-1');
    this.loadPlugin(Plugin1Component);
  }

  async loadPlugin2() {
    const {Plugin2Component} = await import('plugins/plugin-2');
    this.loadPlugin(Plugin2Component);
  }

  private async loadPlugin(component: Type<unknown>) {
    try {
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      const factory = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.viewContainer.createComponent(factory);
    } catch (err) {
      console.log('Could not load module', err);
    }
  }
}
