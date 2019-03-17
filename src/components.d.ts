/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface ClassicSideDrawer {
    'open': () => void;
    'opened': boolean;
    'title': string;
  }
  interface ClassicSideDrawerAttributes extends StencilHTMLAttributes {
    'opened'?: boolean;
    'title'?: string;
  }

  interface ClassicSpinner {}
  interface ClassicSpinnerAttributes extends StencilHTMLAttributes {}

  interface ClassicStockFinder {}
  interface ClassicStockFinderAttributes extends StencilHTMLAttributes {
    'onClassicSymbolSelected'?: (event: CustomEvent<string>) => void;
  }

  interface ClassicStockPrice {
    'stockSymbol': string;
  }
  interface ClassicStockPriceAttributes extends StencilHTMLAttributes {
    'stockSymbol'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'ClassicSideDrawer': Components.ClassicSideDrawer;
    'ClassicSpinner': Components.ClassicSpinner;
    'ClassicStockFinder': Components.ClassicStockFinder;
    'ClassicStockPrice': Components.ClassicStockPrice;
  }

  interface StencilIntrinsicElements {
    'classic-side-drawer': Components.ClassicSideDrawerAttributes;
    'classic-spinner': Components.ClassicSpinnerAttributes;
    'classic-stock-finder': Components.ClassicStockFinderAttributes;
    'classic-stock-price': Components.ClassicStockPriceAttributes;
  }


  interface HTMLClassicSideDrawerElement extends Components.ClassicSideDrawer, HTMLStencilElement {}
  var HTMLClassicSideDrawerElement: {
    prototype: HTMLClassicSideDrawerElement;
    new (): HTMLClassicSideDrawerElement;
  };

  interface HTMLClassicSpinnerElement extends Components.ClassicSpinner, HTMLStencilElement {}
  var HTMLClassicSpinnerElement: {
    prototype: HTMLClassicSpinnerElement;
    new (): HTMLClassicSpinnerElement;
  };

  interface HTMLClassicStockFinderElement extends Components.ClassicStockFinder, HTMLStencilElement {}
  var HTMLClassicStockFinderElement: {
    prototype: HTMLClassicStockFinderElement;
    new (): HTMLClassicStockFinderElement;
  };

  interface HTMLClassicStockPriceElement extends Components.ClassicStockPrice, HTMLStencilElement {}
  var HTMLClassicStockPriceElement: {
    prototype: HTMLClassicStockPriceElement;
    new (): HTMLClassicStockPriceElement;
  };

  interface HTMLElementTagNameMap {
    'classic-side-drawer': HTMLClassicSideDrawerElement
    'classic-spinner': HTMLClassicSpinnerElement
    'classic-stock-finder': HTMLClassicStockFinderElement
    'classic-stock-price': HTMLClassicStockPriceElement
  }

  interface ElementTagNameMap {
    'classic-side-drawer': HTMLClassicSideDrawerElement;
    'classic-spinner': HTMLClassicSpinnerElement;
    'classic-stock-finder': HTMLClassicStockFinderElement;
    'classic-stock-price': HTMLClassicStockPriceElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
