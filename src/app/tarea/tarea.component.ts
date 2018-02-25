import { Component, OnInit, Inject} from '@angular/core';
import { ObjectOrientedRenderer3 } from '@angular/core/src/render3/renderer';
import { Orden } from '../orden';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
  providers: [
    { provide: 'Window', useValue: window}
  ]
})

export class TareaComponent implements OnInit {
  tareanueva = new Orden;

  imprimir() {
      let doc: jsPDF;
      let y: number;
      let fuentes: jsPDF;
      doc = new jsPDF();
      fuentes = doc.getFontList();
      y = 0;

      // Crear marcos
      doc.rect(15, 15, 180, 130, 'S');
      doc.rect(15, 155, 180, 130, 'S');

      // Logo
      let myCanvas: any;
      let logo: any;
      let srcImage: any;
      // Se crea el canvas que contendra la imagen del logo
      myCanvas = document.createElement('canvas');
      myCanvas.height = 177;
      myCanvas.width = 354;
      // Se crea el img que contendra el logo
      srcImage = document.createElement('img');
      srcImage.height = 177;
      srcImage.width = 354;
      srcImage.src = 'assets/logo.png';
      // ctx es el contexto que se usa para dibujar la imagen
      let ctx: CanvasRenderingContext2D;
      ctx = myCanvas.getContext('2d');
      ctx.drawImage(srcImage, 0, 0);
      logo = myCanvas.toDataURL('image/png');

      for (let i = 0; i < 2; i++) {
        doc.line(85, y + 20, 85, y + 50);
        doc.line(20, y + 55, 190, y + 55);
        doc.line(20, y + 85, 190, y + 85);
        doc.line(20, y + 120, 190, y + 120);
        // Encabezado
        doc.addImage(logo, 'PNG', 20, y + 20, 60, 30, 'logo');
        doc.setFontSize(7);
        doc.text(88, y + 22, 'Eva Peron 3386 - Lanus Este');
        doc.text(88, y + 27, 'Telefono: 4220-6655');
        doc.text(88, y + 32, 'E-mail: info@prototype-solutions.com.ar');
        doc.text(88, y + 37, 'Web site: www.prototype-solutions.com.ar');
        doc.setFontSize(10);

        // Fecha
        let fecha: Date;
        let mes: number;
        fecha = new Date;
        mes = fecha.getMonth() + 1;

        doc.text(190, y + 22, 'Numero OT: ', 'right');
        doc.text(190, y + 27, 'Fecha: ' + fecha.getDate() + '/' + mes + '/' + fecha.getFullYear(), 'right');
        doc.setFontSize(14);
        doc.text(88, y + 50, 'Orden de trabajo');
        // Datos original
        doc.setFontSize(10);
        doc.text(20, y + 60, 'Nombre: ' + this.tareanueva.nombre);
        doc.text(20, y + 65, 'Telefono: ' + this.tareanueva.telefono);
        doc.text(20, y + 70, 'Equipo: ' + this.tareanueva.equipo);
        doc.text(20, y + 75, 'Falla: ' + this.tareanueva.falla);
        doc.text(20, y + 80, 'Seña: ' + this.tareanueva.sena);
        doc.text(20, y + 90, 'Diagnostico:');
        doc.text(190, y + 128, 'Presupuesto:____________', 'right');
        // Pie de pagina
        doc.setFontSize(8);
        doc.text(105, y + 135, 'Todo aparato dejado en el laboratorio a efectos de ser reparado y/ò confeccionar presupuesto', 'center');
        doc.text(105, y + 139, 'deberà ser retirado dentro de los 90 dìas a partir de la fecha,reparado ò no,caso contrario', 'center');
        doc.text(105, y + 143, 'se considerarà abandonado por su dueño.', 'center');
        y = 140;
      }
      // Guardar el PDF
       doc.save('Orden.pdf');
  }
  constructor(
    @Inject('Window') private windows: Window
  ) { }

  ngOnInit() {

  }
}
