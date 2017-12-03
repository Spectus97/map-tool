import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MapCollection} from '../model/map-collection';
import {Map} from '../model/map'

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

  @Output() emitUpdateMap: EventEmitter<MapCollection> = new EventEmitter();
  @Output() emitSelectedCard: EventEmitter<Map> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Permet d'interagir sur la carte cliqué
   *
   * @param {Map} map
   */
  public interactMap(map: Map): void{
    this.selectedCard = map;

    if(this.showGrid){
      map.map = this.cardToAssign;
    }

    this.emitSelectedCard.emit(this.selectedCard);
    this.emitUpdateMap.emit(this.map);
  }

  public rotateMap(map: Map): void{
    map.rotation -= 90;
    this.emitUpdateMap.emit(this.map);
  }
}
