import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ConfigService } from '../servicios/config/config.service';


declare const $: any;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(private ConfigService:ConfigService ) { }
/*********
 * Listas
 */
  listaConfig: [];
  
  ngOnInit() {
  }

  /*getAllTickets() {
    this.ConfigService.getAll().subscribe({
      next: (data) => {
        this.listaConfig = [];
        
        $('#tablaProyectos').dataTable().fnDestroy();


        $('#tablaProyectos tbody').on('click', 'tr', function () {
          $(this).toggleClass('selected');
        });

        setTimeout(() => {
          $('#tablaProyectos').DataTable({
            language: {
              url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json'
            },
            pageLength: 10,
            responsive: true
          });
        }, 1);
      },
      error: (e) => {

        console.log(e)
      }
    });
    }*/
}