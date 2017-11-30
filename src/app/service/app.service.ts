import {Injectable} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Injectable()
export class AppService {

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Permet de convertir l'objet MapCollection en Json format
   * @returns {any}
   */
  public convertToJson(obj: any): string {
    return JSON.stringify(obj, null, 4);
  }

  /**
   * Permet de creer le fichier pour telecharger le json
   * @param {string} json
   * @returns {any}
   */
  public saveTextAsFile(data, filename) {

    const blob = new Blob([data], {type: 'text/plain'});
    const event = document.createEvent('MouseEvents');
    const aElement = document.createElement('a');
    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const e = document.createEvent('MouseEvents');
      const a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }

  /**
   * Permet d'exporter le json
   * @param {string} json
   */
  public exportFile(json: string) {
    const fileName = 'map.json';
    this.saveTextAsFile(json, fileName);
  }


}
