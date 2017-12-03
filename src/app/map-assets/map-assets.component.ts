import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-map-assets',
  templateUrl: './map-assets.component.html',
  styleUrls: ['./map-assets.component.scss']
})
export class MapAssetsComponent implements OnInit {

  public nbCards: number = 7;
  public selectedCard: number;
  public cards = new Array(this.nbCards);

  @Output() emitSelectedCard: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Permet de selectionner une map
   *
   * @param {number} num
   */
  public chooseMap(num: number): void {
    this.selectedCard = num;
    this.emitSelectedCard.emit(this.selectedCard);
  }

}
