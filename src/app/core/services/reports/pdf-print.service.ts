import { ElementRef, Injectable, ViewChild, Directive } from '@angular/core';
import { UtilsService } from '../utils.service';
import { ConfigService } from './config.service';

@Directive()
@Injectable({
  providedIn: 'root'
})
export class PdfPrintService {

  @ViewChild('contentToPrint') contentToPrint: ElementRef;

  constructor(
    private util: UtilsService,
    private configService: ConfigService) {
  }

  public captureScreen(formId) {
    const currentUser = this.configService.getCacheItem('User');

    let printContents = document.getElementById(formId).innerHTML;
    const docHead = document.head.innerHTML;
    printContents = `${printContents} Printed By ${currentUser.firstName} ${currentUser.lastName} @ ${this.util.dateTimeFormat(new Date())}`;

    const content = '<head>' + docHead + '</head><body>\n' +
      '<div style="text-align: center; height: 100%; width: 100%;\n' +
      '    position: absolute;\n' +
      '    z-index: 9999;\n' +
      '    background: white;" class="notprint" > \n' +
      '<h1>Preparing your data...</h1>\n' +
      '</div>\n' +
      printContents + '</body>';
    const w = window.open('', '', 'top=0,left=0,height=100%,width=auto');
    w.document.write(content);
    w.document.close();
    w.focus();

    setTimeout(() => {
      w.print();
      if (!this.util.checkMobile()) {
        setTimeout(() => {
          w.close();
        }, 500);
      }
    },
      3000);
  }

}
