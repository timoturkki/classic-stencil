import { Component, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'classic-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContact = false;
  @Prop() title: string;
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContact = content === 'contact'
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContact) {
      mainContent = (
        <div id="contact-info">
          <h2>Contac info</h2>
          <p>You can contact us with</p>
          <ul>
            <li>Phone: 34646</li>
            <li>Mail: aa@sges.com</li>
          </ul>
        </div>
      );
    }
    return [
      <div
        class="backdrop"
        onClick={this.onCloseDrawer.bind(this)}>
      </div>,
      <aside>
        <header><h1>{this.title}</h1></header>

        <button onClick={this.onCloseDrawer.bind(this)} class="close-menu">X</button>

        <section class="tabs">
          <button onClick={this.onContentChange.bind(this, 'nav')} class={!this.showContact ? 'active' : ''}>Navigation</button>
          <button onClick={this.onContentChange.bind(this, 'contact')} class={this.showContact ? 'active' : ''}>Contact</button>
        </section>

        <main>
          {mainContent}
        </main>
      </aside>
    ];
  }
}
