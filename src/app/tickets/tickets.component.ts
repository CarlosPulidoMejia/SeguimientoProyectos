//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { TicketsService } from '../servicios/tickets/ticket.service';
import { listaTickets } from '../clases/tickets/listaTickets';

declare const $: any;
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private TicketsService:TicketsService ) { }
/*********
 * Listas
 */
  listaTickets: listaTickets[];
  selectedFiles?: FileList;
  currentFile?: File;

  ngOnInit() {
    this.getAllTickets();
  }

  getAllTickets() {
    this.TicketsService.getAllTickets().subscribe({
      next: (data) => {
        this.listaTickets = data;       
        $('#tablaTickets').dataTable().fnDestroy();
        $('#tablaTickets tbody').on('click', 'tr', function () {
          $(this).toggleClass('selected');
        });
        setTimeout(() => {
          $('#tablaTickets').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
            pageLength: 5,
            responsive: true
          });
        }, 1);
      },
      error: (e) => {
        console.log(e)
      }
    });
  }
  
  selectFiles(event:any): void {
    this.selectedFiles = event.target.files;
  }

  cargaTickets(){
    const file: File | null = this.selectedFiles.item(0);
    Swal.fire({
      title: "Enviando carga masiva...",
      text: "Espere un momento",
      imageUrl: "../../assets/progress.gif",
      imageWidth: 160,
      imageHeight: 160,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    this.TicketsService.postAgregarTicket(this.currentFile).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err)
      },
      () => {
        console.log("Complete function triggered.")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Archivo enviado correctamente',
          showConfirmButton: false
        })
      }
    )
  }
}