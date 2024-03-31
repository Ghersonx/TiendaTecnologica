import { Component,inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
/* Trabaja como una lista para la importacion de productos **/
import { HousingLocation } from '../housing-location';

import { HousingService } from '../housing.service';
import { createInjectableType } from '@angular/compiler';




@Component({

  
  
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
  
<!-- BARRA DE BUSCADOR  -->
 <section >


      <form  >
      
        <input  type="text "  placeholder="escribe el producto" #filter>
        <button class="primary"   type="button" (click)="filterResults(filter.value)" >   BUSCADOR  </button>
    </form> 
    </section>
    
<!-- BARRA DE BUSCADOR  -->
   
    <section class="results">
        <app-housing-location *ngFor="let housingLocation of
         filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
      </section>

  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {


  /*Matriz pa organizar productos  **/

  housingLocationList: HousingLocation[] =  []; 

  housingService :HousingService =inject (HousingService);

  filteredLocationList :HousingLocation[] = [];


  constructor(){
  
    this.housingService.getAllHousingLocations().then(( housingLocationList:HousingLocation []) =>  
    {   
      this.housingLocationList =  housingLocationList;
      this.filteredLocationList =housingLocationList;

    } ) ;
  }

  filterResults (text :string)  {
    if (!text)  this.filteredLocationList =this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      
      housingLocation => housingLocation?.name.toLowerCase().includes (text.toLowerCase())
    );

  }



}
