import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { HttpsService } from 'src/app/https.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export interface Lang {
  fin: string;
  eng: string;
}

export interface Word {
  lang: string;
  word: Lang;
}

export interface Image {
  name: string;
  url1: string;
  url2: string;
  title: string;
  alt: string;
  href: string;
  type: string;
  size: string;
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export interface Badge {
  href: string;
  name: string;
}

export interface Product {
  pgid: number;
  code: string;
  title: string;
  colorOptions: number;
  stockTotal: number;
  thumb: number;
  comments: number;
  stars: any;
  listprice: number;
  listpriceVatFree: number;
  saleprice: number;
  salepriceVatFree: number;
  brand: number;
  images: Image[];
  badges: Badge[];
  grid: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightgreen' },
    { text: 'Two', cols: 1, rows: 1, color: '#fcfcfc' },
    { text: 'Three', cols: 1, rows: 1, color: 'tomato' },
    { text: 'Four', cols: 1, rows: 2, color: '#lightgreen' },
    { text: 'Five', cols: 1, rows: 1, color: '#fcfcfc' },
    { text: 'Six', cols: 1, rows: 1, color: 'tomato' },
    { text: 'Seven', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Eight', cols: 1, rows: 1, color: '#fcfcfc' },
    { text: 'Nine', cols: 1, rows: 1, color: 'tomato' },
    { text: 'Ten', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Eleven', cols: 2, rows: 1, color: '#fcfcfc' },
    { text: 'Twelve', cols: 1, rows: 1, color: 'tomato' },
    { text: 'Thirteen', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Fourteen', cols: 1, rows: 2, color: '#fcfcfc' },
    { text: 'Sixteen', cols: 1, rows: 1, color: 'tomato' },
    { text: 'Seventeen', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Eighteen', cols: 1, rows: 1, color: '#fcfcfc' },
    { text: 'Nineteen', cols: 1, rows: 1, color: 'tomato' },
    { text: 'Twenty', cols: 1, rows: 1, color: 'lightgrey' },
    { text: 'Twentyone', cols: 1, rows: 1, color: '#fcfcfc' }
  ];

  color: string[] = ['lightgreen', '#fcfcfc', 'tomato'];

  title = 'app';
  tileColor: string = '#eee';
  bgStyle = {
    'background-color': '#cecece',
    background: 'no-repeat center center',
    'background-image': ''
  };
  watcher: Subscription;
  activeMediaQuery = '';
  cols = 2;
  firstColSpan = 2;
  words: Lang[];
  products: Product[];
  constructor(media: ObservableMedia, private HttpsService: HttpsService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change
        ? `'${change.mqAlias}' = (${change.mediaQuery})`
        : '';
      if (change.mqAlias === 'xs') {
        this.cols = 2;
        this.firstColSpan = 1;
      } else if (change.mqAlias === 'sm') {
        this.cols = 3;
        this.firstColSpan = 1;
      } else if (change.mqAlias === 'md') {
        this.cols = 4;
        this.firstColSpan = 2;
      } else if (change.mqAlias === 'lg') {
        this.cols = 5;
        this.firstColSpan = 2;
      } else if (change.mqAlias === 'xl') {
        this.cols = 6;
        this.firstColSpan = 2;
      } else {
        this.cols = 2;
        this.firstColSpan = 1;
      }
    });
  }

  frontpage() {
    this.HttpsService.getFrontpage().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('done loading words');
      }
    );
  }

  searchEngWorld(word: string) {
    this.HttpsService.getEngWords(word).subscribe(
      data => {
        this.words = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('done loading words');
      }
    );
  }

  setBackground(url: string): string {
    return url;
  }
  setPrice(p: Product) {
    return p.saleprice + ' &euro;';
  }

  ngOnInit() {
    this.searchEngWorld('auto');
    this.frontpage();
    console.log(this.products);
  }
}
