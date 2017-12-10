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
  @Output() emitClearMap: EventEmitter<void> = new EventEmitter();
  @Output() emitImportedMap: EventEmitter<MapCollection> = new EventEmitter();

  public mapJson: string;
  public showGrid: boolean;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
  }

  public fileToUpload(file: any): void{
    this.readThis(file.target);
  }

  public readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    const fileType = inputValue.parentElement.id;
    myReader.readAsText(file);

    console.log(fileType);

    myReader.onloadend = () => {
      if(file.name.substr(file.name.lastIndexOf('.') + 1) === 'json'){
        this.map = JSON.parse(myReader.result);
        this.emitImportedMap.emit(this.map);
      }
    };
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
