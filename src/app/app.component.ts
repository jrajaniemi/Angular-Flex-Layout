import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  title = 'app';
  tileColor: string = '#eee';

  watcher: Subscription;
  activeMediaQuery = '';
  cols = 2;
  firstColSpan = 2;
  constructor(media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias === 'xs') {
         this.cols = 1;
         this.firstColSpan = 1;
      } else if ( change.mqAlias === 'sm') {
        this.cols = 2;
        this.firstColSpan = 1;
      } else if ( change.mqAlias === 'md') {
        this.cols = 3;
        this.firstColSpan = 2;
      } else if ( change.mqAlias === 'lg') {
        this.cols = 4;
        this.firstColSpan = 2;
      } else if ( change.mqAlias === 'xl') {
        this.cols = 5;
        this.firstColSpan = 2;
      } else {
        this.cols = 2;
        this.firstColSpan = 1;
      }
    });
  }

  ngOnInit() {

  }
}
