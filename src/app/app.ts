import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [Button, TableModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  environment = environment;
  pizzas = httpResource<any[]>(() => environment.baseUrl + '/api/pizza');

  constructor() {
    this.pizzas.error
  }
}
