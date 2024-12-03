import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css'
})
export class AddArticleComponent {
  title = '';
  price = '';
  category = '';
  gender = '';
  description = '';
  photos: File[] = [];

  constructor(private auth : AuthService, private router : Router){}

  /*ngOnInit(){
    if(!this.auth._isLoggedIn){
      alert("you must login first!");
      this.router.navigate(["/"]);
    }
  }*/

  categories = [
    { type: 'Upper Wear', items: ['T-shirt', 'Blouse', 'Sweater'] },
    { type: 'Bottom Wear', items: ['Jeans', 'Shorts', 'Skirt'] },
    { type: 'Outerwear', items: ['Jacket', 'Coat', 'Hoodie'] },
    { type: 'Footwear', items: ['Sneakers', 'Boots', 'Sandals'] }
  ];


  onFileSelect(event: any): void {
    const selectedFiles = Array.from(event.target.files) as File[];

    // Restrict to 5 files max
    if (selectedFiles.length + this.photos.length > 5) {
        alert("no more than 5pics");
        return;
    }

  const validFiles = selectedFiles.filter(file =>
      file.type.startsWith('image/')
    );

    if (validFiles.length < selectedFiles.length) {
      alert('Some files are not valid image files.');
    }

    // Add valid files to the photos array
    this.photos.push(...validFiles);
  }

  verifInput() {
    const titleRegex = /^[a-zA-Z ]+$/;
    const priceRegex = /^[0-9]+$/;
  
    // Validate title
    const titleElement = document.getElementById("title") as HTMLInputElement;
    if (!this.title || !titleRegex.test(this.title)) {
      titleElement?.style.setProperty("border-color", "red");
      titleElement.placeholder = "Title must contain only letters and spaces!";
    } else {
      titleElement?.style.setProperty("border-color", "#000");
    }
  
    // Validate price
    const priceElement = document.getElementById("price") as HTMLInputElement;
    if (!this.price || !priceRegex.test(this.price)) {
      priceElement?.style.setProperty("border-color", "red");
      priceElement.placeholder = "Price must be a valid number!";
    } else {
      priceElement?.style.setProperty("border-color", "black");
    }
  
    // Validate select
    const selectElement = document.getElementById("select") as HTMLSelectElement;
    if (selectElement?.selectedIndex === 0) {
      selectElement?.style.setProperty("border-color", "red");
    } else {
      selectElement?.style.setProperty("border-color", "black");
    }

    const radioBtnMan = document.getElementById("man") as HTMLInputElement;
    const radioBtnWoman = document.getElementById("woman") as HTMLInputElement;
    if(!radioBtnMan.checked && !radioBtnWoman.checked) {
      radioBtnMan?.style.setProperty("outline", "0.1px dashed red");
      radioBtnWoman?.style.setProperty("outline", "0.1px dashed red");
    } else {
      radioBtnMan?.style.setProperty("outline", "initial");
      radioBtnWoman?.style.setProperty("outline", "initial");
    }
  
    // Ensure at least one photo is selected
    const photoElement = document.getElementById("images") as HTMLInputElement;
    if (!this.photos || this.photos.length === 0) {
      photoElement?.style.setProperty("outline", "0.1px dashed red");
    } else {
      photoElement?.style.setProperty("outline", "initial");
    }
  
    // If valid, submit the form
    //const formElement = document.querySelector("form") as HTMLFormElement;
    //formElement?.submit();*/
  }

  reset(){
    const titleElement = document.getElementById("title") as HTMLInputElement;
    const priceElement = document.getElementById("price") as HTMLInputElement;
    const selectElement = document.getElementById("select") as HTMLSelectElement;
    const radioBtnMan = document.getElementById("man") as HTMLInputElement;
    const radioBtnWoman = document.getElementById("woman") as HTMLInputElement;
    const photoElement = document.getElementById("images") as HTMLInputElement;
    const textAreaElement = document.getElementById("images") as HTMLTextAreaElement;

    titleElement.value = "";
    priceElement.value = "";
    textAreaElement.value = "";
    selectElement.selectedIndex = 0;
    radioBtnMan.checked = radioBtnWoman.checked = false;

  }
  
  
  

  
}
