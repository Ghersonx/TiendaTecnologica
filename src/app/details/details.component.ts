import { Component,inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

//Importacion de formularios
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({  
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo">

     <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}  </h2>
      <p   class="listing-location">{{housingLocation?.city}}
      {{housingLocation?.state}} </p>
     </section>

     <section   class="listing-features">
      <h2 class="section-heading">CARACTERISTICAS DEL PRODUCTO</h2>
      <ul>  
        <li> Unidades disponibles   {{housingLocation?.availableUnits}}  </li>
     <!--        <li>  Este porducto funcion por bluetooth {{housingLocation?.wifi}} </li> 
        <li> Este producto tiene Garantia  {{housingLocation?.laundry}} </li>  -->
      </ul>
   </section>

   <section class="listing-apply">
      <h2 class="section heading">  Solicita este producto  </h2>

    <!-- Formulario   -->   
    
    <form [formGroup]="applyForm">

      <label  for="first-name "> Nombre  </label>
      <input  id="first-name" type="text" formControlName="FirstName">

      <label  id="last-name "> Apellido </label>
      <input  id="last-name" type="text" formControlName="lastName">

      <label  for="email "> Gmail </label>
      <input  id="email" type="email" formControlName="email">

      <button type="submit" class="primary" >  solicitar ahora </button>
    </form>

   </section> 


  </article>

  `,
  
  styleUrl: './details.component.css'
})

export class DetailsComponent {

  route:ActivatedRoute =inject(ActivatedRoute);

  housingService =inject(HousingService);
  housingLocation :HousingLocation |undefined;

  //grupo de formulario datos

  applyForm =new FormGroup ({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')



  });


  constructor (){

    const housingLocationId=Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {

    this.housingLocation =housingLocation;  
    });
  }


  submitApplication(){

    this.housingService.submitApplication(

      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',


    )
  }

}


