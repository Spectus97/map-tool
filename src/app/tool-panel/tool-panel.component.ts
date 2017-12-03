import {Component, Input, OnInit} from '@angular/core';
import {Map} from "../model/map";

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss']
})
export class ToolPanelComponent implements OnInit {

  @Input() public selectedCard: Map;

  constructor() { }

  ngOnInit() {
  }

}
