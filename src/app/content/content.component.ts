import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapCollection} from '../model/map-collection';
import {Map} from '../model/map'
import {Offset} from "../model/offset";
import * as _ from 'lodash';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() map: MapCollection;
  @Input() cardToAssign: number; // Represente le numero de la map depuis l'assets
  @Input() showGrid: boolean; // Permet d'afficher la grille ou non
  @Input() selectedCard: Map; // Carte selectionné
  @Input() mapWidth: number; // Represente la largeur de la map totale

  @Output() emitUpdateMap: EventEmitter<MapCollection> = new EventEmitter();
  @Output() emitSelectedCard: EventEmitter<Map> = new EventEmitter();

  public offset: Offset = new Offset(0, 0);
  public mapToDisplay: MapCollection;
  public widthToDisplay: number = 5; // Represente le nombre de case affichable de part et d'autre de la case centrale

  constructor() {
  }

  ngOnInit() {
    this.calculateMapToDisplay(this.offset);
  }

  /**
   * Permet de savoir s'il est possible de se deplacer dans la direction souhaité
   * @param {number} direction
   * @returns {boolean}
   */
  public canMovePanel(direction: number): boolean {
    switch (direction) {
      // TOP
      case 0:
        return ((this.mapWidth / 2) - this.widthToDisplay + this.offset.x - 1) >= 0;

      // RIGHT
      case 1:
        return ((this.mapWidth / 2) + this.widthToDisplay + this.offset.y + 1) <= this.mapWidth;

      // BOTTOM
      case 2:
        return ((this.mapWidth / 2) + this.widthToDisplay + this.offset.x + 1) <= this.mapWidth;

      // LEFT
      case 3:
        return ((this.mapWidth / 2) - this.widthToDisplay + this.offset.y - 1) >= 0;
    }
  }

  /**
   * Permet de deplacer la vue de la map
   *
   * @param {number} direction
   */
  public movePanel(direction: number): void {
    if(!this.canMovePanel(direction)){
      return;
    }

    switch (direction) {
      // TOP
      case 0:
        this.offset.x -= 1;
        break;

      // RIGHT
      case 1:
        this.offset.y += 1;
        break;

      // BOTTOM
      case 2:
        this.offset.x += 1;
        break;

      // LEFT
      case 3:
        this.offset.y -= 1;
        break;
    }

    this.calculateMapToDisplay(this.offset);
  }

  /**
   * Permet d'interagir sur la carte cliqué
   *
   * @param {Map} map
   */
  public interactMap(map: Map): void {
    this.selectedCard = map;

    if (this.showGrid && this.cardToAssign >= 0) {
      map.map = this.cardToAssign;
    }

    this.emitSelectedCard.emit(this.selectedCard);
    this.emitUpdateMap.emit(this.map);
  }

  /**
   * Permet d'effectuer une rotation de la carte
   * @param {Map} map
   */
  public rotateMap(map: Map): void {
    map.rotation -= 90;
    this.emitUpdateMap.emit(this.map);
  }

  /**
   * Permet de calculer la map à afficher à l'ecran
   * @private
   */
  public calculateMapToDisplay(offset: Offset): void {
    const offsetMinX = ((this.mapWidth / 2) - this.widthToDisplay + offset.x);
    const offsetMaxX = ((this.mapWidth / 2) + this.widthToDisplay + offset.x);

    const offsetMinY = ((this.mapWidth / 2) - this.widthToDisplay + offset.y);
    const offsetMaxY = ((this.mapWidth / 2) + this.widthToDisplay + offset.y);


    this.mapToDisplay = new MapCollection();
    this.mapToDisplay.maps = [];

    for (let x = offsetMinX; x < offsetMaxX; x++) {
      for (let y = offsetMinY; y < offsetMaxY; y++) {
        const card = _.find(this.map.maps, card => {
          return card.posX === x && card.posY === y;
        });

        this.mapToDisplay.maps.push(card);
      }
    }

    console.log(this.mapToDisplay);
  }
}
