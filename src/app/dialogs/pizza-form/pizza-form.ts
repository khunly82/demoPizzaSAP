import { Component, inject, signal } from '@angular/core';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from "primeng/inputtext";
import { Button } from "primeng/button";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pizza-form',
  imports: [FormRoot, InputText, FormField, Button],
  templateUrl: './pizza-form.html',
  styleUrl: './pizza-form.css',
})
export class PizzaForm {

  httpClient = inject(HttpClient);
  ref = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  imageFile: any

  values = signal<{ name: string, price: number, imageFile: any }>({
    name: '',
    price: 0,
    imageFile: null 
  });

  form = form(this.values)

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  submit(event: any){
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.values().name);
    formData.append('price', this.values().price.toString());
    formData.append('imageFile', this.imageFile);
    this.httpClient.post(environment.baseUrl + '/api/pizza', formData)
      .subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Une nouvelle pizza a été ajoutée' })
          this.ref.close(true);
        }
      });
  }

}
