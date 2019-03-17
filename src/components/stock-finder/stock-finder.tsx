import { Component, State, Event, EventEmitter } from '@stencil/core';

import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'classic-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  stockNameInput: HTMLInputElement;

  @State() searchResults: {symbol: string, name: string }[] = [];
  @State() loading = false;

  @Event({bubbles: true, composed: true}) classicSymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsed => {
        this.searchResults = parsed['bestMatches'].map(match => {
          return {
            name: match['2. name'],
            symbol: match['1. symbol']
          }
        })
        this.loading = false;
      })
      .catch(e => {
        console.log(e);
        this.loading = false;
      });
  }

  onSelectSymbol(symbol: string) {
    this.classicSymbolSelected.emit(symbol);
  }

  render() {
    let dataContent = (
      <ul>
        {this.searchResults.map(result => (
          <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong> - {result.name}
          </li>
        ))}
      </ul>
    );
    if (this.loading) {
      dataContent = <classic-spinner />;
    }
    return [
      <form onSubmit={this.onFindStocks.bind(this)} autocomplete="nope">
        <input
          autocomplete="off"
          id="stock-symbol"
          ref={el => this.stockNameInput = el}
          />

        <button
          type="submit">
          Find
        </button>
      </form>,
      <ul>
        {dataContent}
      </ul>
    ];
  }
}
