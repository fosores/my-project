import { Component } from '@angular/core';
import { TreeTableComponent } from '../../components/tree-table/tree-table.component';
import { TreeTableItemComponent } from '../../components/tree-table-item/tree-table-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [TreeTableComponent, TreeTableItemComponent, CommonModule],
})
export class DemoComponent {
  headers: string[] = [
    "Módulo",
    "Listado de productos/servicios con comprobantes reportes ó extractos",
    "",
  ];
  data: any[] = [
    {
      module: "primer Nivel",
      children: [
        {
          services: "Segundo Nivel",
          link: "Consultar",
          children: [{ services: "Tercer Nivel" }],
        },
        {
          services: "Depósito Tarjetas Banelco",
          link: "Consultar Modulo",
          children: [{ services: "Adjuntos proveedores" }],
        },
        { services: "Débito Inmediato" },
        { services: "Depósito Tarjetas Banelco", link: "Consultar Modulo" },
      ],
    },
    {
      module: "Primer Nivel 2",
      services: null,
      children: [],
    },
    {
      module: "Primer Nivel 3",
      children: [
        {
          services: "Segundo Nivel 3",
          link: "Consultar",
          children: [
            { services: "Tercer nivel 3" },
            { services: "Tercer nivel 3" },
            { services: "Tercer nivel 3" },
            { services: "Tercer nivel 3" },
          ],
        },
        { services: "Débito Inmediato 3" },
        { services: "Depósito Tarjetas Banelco", link: "Consultar Modulo" },
        {
          services: "Depósito Tarjetas Banelco 3",
          link: "Consultar Modulo",
          children: [
            {
              services: "Débito Directo 3",
            },
          ],
        },
      ],
    },
    {
      module: "Primer Nivel 4",
      children: [
        {
          services: "Segundo Nivel 4",
          link: "Consultar",
          children: [
            { services: "Tercer nivel 4" },
            { services: "Tercer nivel 4" },
            { services: "Tercer nivel 4" },
            { services: "Tercer nivel 4" },
          ],
        },
        { services: "Débito Inmediato 3" },
        { services: "Depósito Tarjetas Banelco", link: "Consultar Modulo" },
        {
          services: "Depósito Tarjetas Banelco 3",
          link: "Consultar Modulo",
          children: [
            {
              services: "Débito Directo 3",
            },
          ],
        },
      ],
    },
  ];

  itemClick(event: any) {
    console.log("Evento Click Demo", event);
  }
}
