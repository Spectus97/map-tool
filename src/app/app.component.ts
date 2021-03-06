import {Component, OnInit} from '@angular/core';
import {MapCollection} from './model/map-collection';
import {Map} from './model/map';
import * as _ from 'lodash';
import {Offset} from "./model/offset";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public map: MapCollection;
  public mapToDisplay: MapCollection;
  public mapWidth = 20;
  public showGrid: boolean;
  public selectedCardFromAssets: number;
  public selectedCard: Map;

  constructor() {
  }

  public ngOnInit(): void {
    this._init();
  }

  /**
   * Remet par défaut la map
   */
  public clearMap(): void {
    this._init();
  }

  /**
   * Met à jour la map depuis un import
   * @param {MapCollection} importedMap
   */
  public updateMapByImport(importedMap: MapCollection): void {
    this._init(importedMap);
  }

  /**
   * Met à jour la valeur de l'état d'affichage de la grille
   *
   * @param {boolean} state
   */
  public updateShowGridState(state: boolean): void {
    this.showGrid = state;
  }

  /**
   * Met à jour la valeur de la carte selectionné dans les assets
   *
   * @param {number} card
   */
  public updateSelectedCardFromAssets(card: number): void {
    this.selectedCardFromAssets = card;
  }

  /**
   * Met à jour la carte séléctionnée depuis la map
   * @param {Map} card
   */
  public updateSelectedCardFromContent(card: Map): void {
    this.selectedCard = card;
  }

  /**
   * Met à jour la map
   *
   * @param {MapCollection} map
   */
  public updateMap(map: MapCollection): void {
    this.map = map;
  }

  /**
   * Permet d'initialiser la taille de la map
   * @private
   */
  private _init(mapToImplement?: MapCollection): void {
    this.map = new MapCollection();
    this.map.maps = [];

    for (let x = 0; x < this.mapWidth; x++) {
      for (let y = 0; y < this.mapWidth; y++) {
        if (mapToImplement) {
          const mapFound = _.find(mapToImplement.maps, card => {
            return card.posX === x && card.posY === y;
          });

          if (mapFound) {
            this.map.maps.push(mapFound);
          } else {
            const card = new Map();
            card.posX = x;
            card.posY = y;
            card.map = 0;
            card.rotation = 0;

            this.map.maps.push(card);
          }
        } else {
          const card = new Map();
          card.posX = x;
          card.posY = y;
          card.map = 0;
          card.rotation = 0;

          this.map.maps.push(card);
        }
      }
    }
  }
}
