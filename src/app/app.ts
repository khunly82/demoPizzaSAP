import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Button } from "primeng/button";
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { PizzaForm } from './dialogs/pizza-form/pizza-form';

@Component({
  selector: 'app-root',
  imports: [Button, TableModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  dialogService = inject(DialogService);
  environment = environment;
  pizzas = httpResource<any[]>(() => environment.baseUrl + '/api/pizza');

  constructor() {
    this.pizzas.error
  }

  openPizzaForm() {
    const ref = this.dialogService.open(PizzaForm, {
      header: 'Ajouter une pizza',
      resizable: true,
      draggable: true,
      maximizable: true,
    });

    ref?.onClose.subscribe(result => {
      if(result) {
        this.pizzas.reload()
      }
    })
  }
}
