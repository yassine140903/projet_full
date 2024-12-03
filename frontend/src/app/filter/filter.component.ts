import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {

  constructor(private sharedService : SharedService){};

  searchInput?: string;
  min?: number;
  max?: number;
  sortOrder = '';
  selectedRegion = '';
  selectedCategory = '';
  gender = '';
  filterParams = {
    search: this.searchInput,
    min: this.min,
    max: this.max,
    region: this.selectedRegion,
    category: this.selectedCategory,
    gender: this.gender
  };

  region: any = [
    'Tunis', 'Ben Arous', 'Manouba', 'Ariana', 'Kebili', 'Sfax', 'Gafsa', 
    'Nabeul', 'Bizerte', 'Jendouba', 'Kef', 'Béja', 'Kairouan', 'Kasserine', 
    'Sidi Bouzid', 'Tozeur', 'Tataouine', 'Medenine', 'Gabes', 'Sousse', 
    'Monastir', 'Mahdia', 'Zaghouan', 'Siliana'
  ];

  categories = [
    { type: 'Upper Wear', items: ['T-shirt', 'Blouse', 'Sweater'] },
    { type: 'Bottom Wear', items: ['Jeans', 'Shorts', 'Skirt'] },
    { type: 'Outerwear', items: ['Jacket', 'Coat', 'Hoodie'] },
    { type: 'Footwear', items: ['Sneakers', 'Boots', 'Sandals'] },
  ];

  resetForm(form: NgForm) {
      form.resetForm({
        min: null,
        max: null,
        sortOrder: '', // Default value for the first option in the Sort dropdown
        selectedRegion: '', // Default for the first region option
        selectedCategory: '', // Default for the first category option
        gender: '', // Default for no selection
      });
      this.searchInput = '';
  }

  verifInput() {
    const minElement = document.getElementById("min") as HTMLInputElement;
    const maxElement = document.getElementById("max") as HTMLInputElement;
    
    if ((this.min === undefined && this.max === undefined) ||
    (this.min && this.max && Number(this.min) <= Number(this.max)))
      return true;
    if (this.min && isNaN(this.min)) {
      minElement?.style.setProperty("border", "2px dashed red");
      minElement?.style.setProperty("color", "red");
      return false;
    }else {
      minElement?.style.setProperty("border", "0.1px solid #000");
      minElement?.style.setProperty("color", "#000");

      if (this.max && isNaN(this.max)) {
        maxElement?.style.setProperty("border", "2px dashed red");
        maxElement?.style.setProperty("color", "red");
        return false;
      }else {
        maxElement?.style.setProperty("border", "0.1px solid #000");
        maxElement?.style.setProperty("color", "#000");
        return true;
      }
    }
  }
  

  applyFilter() {
      // Prepare filter params object with only the selected/filled values
      const filterParams: any = {};
    
      // Only add non-null/undefined values to the filterParams
      if (this.searchInput) {
        filterParams.search = this.searchInput;
      }
    
      if (this.sortOrder) {
        filterParams.sortOrder = this.sortOrder;
      }

      if (this.selectedRegion) {
        filterParams.region = this.selectedRegion;
      }
    
      if (this.selectedCategory) {
        filterParams.category = this.selectedCategory;
      }
    
      if (this.gender) {
        filterParams.gender = this.gender;
      }
    
      // Now we have the filterParams object ready with only the valid attributes.
      if(this.verifInput()){
        filterParams.min = this.min;
        filterParams.max = this.max;
        //HERE USE LOCAL_STORAGE BRO:
        /*localStorage.setItem('filterParams', JSON.stringify(filterParams));

        // Optionally, notify other components about the filter change
        window.dispatchEvent(new Event('filterParamsUpdated'));
        console.log("mnadham b3athtlak");*/
      }
  }

  

}
