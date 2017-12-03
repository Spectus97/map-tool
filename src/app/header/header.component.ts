import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../service/app.service';
import {MapCollection} from '../model/map-collection';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() map: MapCollection;

  @Output() emitShowGridState: EventEmitter<boolean> = new EventEmitter();

  public mapJson: string;
  public showGrid: boolean;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
  }

  /**
   * Permet de telecharger la map
   */
  public save(): void {
    const mapToExport = _.cloneDeep(this.map);

    // On retire les maps qui ont pour valeur de map === 0 car il s'agit d'une carte vide
    mapToExport.maps = _.filter(mapToExport.maps, map => {
      return map.map > 0;
    });

    this.mapJson = this.appService.convertToJson(mapToExport);

    this.appService.exportFile(this.mapJson);
  }

  /**
   * Gere l'affichage de la grille
   */
  public displayGrid(): void {
    this.showGrid = !this.showGrid;
    this.emitShowGridState.emit(this.showGrid);
  }
}
