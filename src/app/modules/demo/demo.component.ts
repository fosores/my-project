import { Component } from '@angular/core';
import { TreeTableComponent } from '../../components/tree-table/tree-table.component';
import { TreeTableItemComponent } from '../../components/tree-table-item/tree-table-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [TreeTableComponent, TreeTableItemComponent, CommonModule]
})
export class DemoComponent {
  headers: string[] = [
    "Módulo",
    "Listado de productos/servicios con comprobantes reportes ó extractos"
  ];
  data: any[] = [
    {
      module: "Cuentas",
      services: "",
      children: [
        {
          services: "Débito Directo",
          link: "Consultar",
          children: ["Nota de Crédito", "Nota de Crédito"],
        },
        {
          services: "Depósito Tarjetas Banelco",
          link: "Consultar Modulo",
          children: ["Adjuntos Pago Proveedores", "Adjuntos Pago Proveedores"],
        },
        { services: "Débito Inmediato" },
        { services: "Depósito Tarjetas Banelco", link: "Consultar Modulo" },
      ],
    },
    {
      module: "Cuentas 2",
      services: null,
      children: [],
    },
    {
      module: "Cuentas 3",
      services: "Un service",
      children: [
        {
          services: "Débito Directo 3",
          link: "Consultar",
          children: ["Nota de Crédito", "Nota de Crédito"],
        },
        { services: "Débito Inmediato 3" },
        { services: "Depósito Tarjetas Banelco", link: "Consultar Modulo" },
        {
          services: "Depósito Tarjetas Banelco 3",
          link: "Consultar Modulo",
          children: [
            {
              services: "Débito Directo 3",
              link: "Consultar",
              children: ["Nota de Crédito", "Nota de Crédito"],
            },
          ],
        },
      ],
    },
  ];
}
