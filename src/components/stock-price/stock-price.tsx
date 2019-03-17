import { Component, State, Element, Prop, Watch, Listen } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'classic-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({mutable: true, reflectToAttr: true}) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stockSymbol = this.stockInput.value;

    //this.fetchStockPrice(stockSymbol);
  }

  componentWillLoad() {
    console.log('will load')
    console.log(this.stockSymbol)
  }

  componentDidLoad() {
    console.log('did load');

    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log('will update');
  }

  componentDidUpdate() {
    console.log('did update');

    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  componentDidUnload() {
    console.log('did unload');
  }

  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsed => {
        if (!parsed['Global Quote']['05. price']) {
          throw new Error('invalid symbol');
        }
        this.fetchedPrice = parsed['Global Quote']['05. price']
        this.error = null;
        this.loading = false;
      })
      .catch(e => {
        this.error = e.message;
        this.fetchedPrice = null;
        this.loading = false;
      });
  }

  hostData() {
    return {
      class: this.error ? 'error' : ''
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;

    if (this.stockUserInput.trim().length > 0) {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  @Listen('body:classicSymbolSelected')
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }
    if (this.loading) {
      dataContent = <classic-spinner />;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)} autocomplete="nope">
        <input
          autocomplete="off"
          id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
          />

        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,
      <div>
        {dataContent}
      </div>
    ];
  }
}
