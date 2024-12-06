import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  title = '';
  price = '';
  category = '';
  gender = '';
  description = '';
  location = '';
  photos: File[] = [];
  maxPhotos = 3;

  categories = [
    { type: 'Upper Wear', items: ['T-shirt', 'Blouse', 'Sweater'] },
    { type: 'Bottom Wear', items: ['Jeans', 'Shorts', 'Skirt'] },
    { type: 'Outerwear', items: ['Jacket', 'Coat', 'Hoodie'] },
    { type: 'Footwear', items: ['Sneakers', 'Boots', 'Sandals'] },
    { type: '--------', items: ['Other'] }
  ];

  regions = [
    'Tunis', 'Ben Arous', 'Manouba', 'Ariana', 'Kebili', 'Sfax', 'Gafsa', 
    'Nabeul', 'Bizerte', 'Jendouba', 'Kef', 'Béja', 'Kairouan', 'Kasserine', 
    'Sidi Bouzid', 'Tozeur', 'Tataouine', 'Medenine', 'Gabes', 'Sousse', 
    'Monastir', 'Mahdia', 'Zaghouan', 'Siliana'
  ];

  constructor(private router: Router, private sharedService: SharedService) {}

  onFileSelect(event: any): void {
    const selectedFiles: FileList = event.target.files;
    const fileArray = Array.from(selectedFiles);
    console.log(fileArray);
  
    // Limit to a maximum of maxPhotos photos
    if(fileArray.length <= this.maxPhotos) {
      this.photos = fileArray;
      this.clearErrorStyle('photos');
      this.errmsg = '';
    }else{
      this.errmsg = 'Maximum 3 photos are allowed .';
      this.applyErrorStyle('photos', 'Maximum 3 photos are allowed .');
      this.photos = [];
      const fileInput = document.getElementById('photos') as HTMLInputElement;
      if (fileInput) {
          fileInput.value = ''; // Reset the file input
          fileInput.dispatchEvent(new Event('input'));
      }
    }
  }
  

  errmsg: string = ''; // Holds the first error message for display in the div

validateAndSubmit(): void {
    let isValid = true;
    this.errmsg = ''; // Reset error message

    // Validate title
    if (!this.title.trim() || !/^[a-zA-Z\s]+$/.test(this.title)) {
        this.applyErrorStyle('title', 'Title must only contain letters and spaces.');
        if (!this.errmsg.length) this.errmsg = 'Title must only contain letters and spaces.';
        isValid = false;
    } else {
        this.clearErrorStyle('title');
    }

    // Validate price
    if (!this.price.trim() || isNaN(Number(this.price))) {
        this.applyErrorStyle('price', 'Price must be a valid number.');
        if (!this.errmsg.length) this.errmsg = 'Price must be a valid number.';
        isValid = false;
    } else {
        this.clearErrorStyle('price');
    }

    // Validate category
    if (!this.category) {
        this.applyErrorStyle('category', 'Category is required.');
        if (!this.errmsg.length) this.errmsg = 'Category is required.';
        isValid = false;
    } else {
        this.clearErrorStyle('category');
    }

    // Validate location
    if (!this.location) {
        this.applyErrorStyle('location', 'Location is required.');
        if (!this.errmsg.length) this.errmsg = 'Location is required.';
        isValid = false;
    } else {
        this.clearErrorStyle('location');
    }

    // Validate gender
    if (!this.gender) {
        this.applyErrorStyle('gender', 'Please select a gender.');
        if (!this.errmsg.length) this.errmsg = 'Please select a gender.';
        isValid = false;
    } else {
        this.clearErrorStyle('gender');
    }

    // Validate photos
    if (this.photos.length === 0) {
        this.applyErrorStyle('photos', 'At least one photo is required.');
        if (!this.errmsg.length) this.errmsg = 'At least one photo is required.';
        isValid = false;
    } else {
        this.clearErrorStyle('photos');
    }

    if (!isValid) return; // Stop if form is invalid

    // Prepare data for submission
    if (!isValid) return; // Stop if form is invalid

// Prepare form data for submission
  // Prepare data for submission
  const formData = new FormData();
  
  // Add text fields to the FormData
  formData.append('title', this.title.trim());
  formData.append('price', this.price.trim());
  formData.append('category', this.category);
  formData.append('gender', this.gender);
  formData.append('description', this.description.trim());
  formData.append('location', this.location);

  // Add all photos as part of the "photos[]" array-like field
  this.photos.forEach(photo => {
    formData.append('images', photo, photo.name); // Using array-like field name
  });

  // Debugging: Check the FormData contents
  console.log(formData);

  // Submit the formData to the backend
  this.sharedService.postArticle(formData).subscribe({
    next: () => {
      this.router.navigate(['/']); // Redirect to homepage or another page
    },
    error: (err) => {
      console.error('Upload failed:', err);
      this.errmsg = err?.error?.message || 'An error occurred while adding the article.';
    },
  });


}


  /**
   * Resets the form to its initial state.
   */
  resetForm(): void {
    this.title = '';
    this.price = '';
    this.category = '';
    this.gender = '';
    this.description = '';
    this.location = '';
    this.photos = [];
    const fileInput = document.getElementById('photos') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input when component initializes
    }

    // Clear all error styles
    this.clearErrorStyle('title');
    this.clearErrorStyle('price');
    this.clearErrorStyle('category');
    this.clearErrorStyle('location');
    this.clearErrorStyle('gender');
    this.clearErrorStyle('photos');
  }

  /**
   * Applies error styles to an element by ID.
   */
  private applyErrorStyle(elementId: string, message: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.outline = '2px dashed red';
      element.setAttribute('placeholder', message); // Tooltip for additional context
    }
  }

  /**
   * Clears error styles from an element by ID.
   */
  private clearErrorStyle(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.outline = 'initial'; // Reset border color
      element.removeAttribute('placeholder');
    }
  }

  ngOnInit(){
    const fileInput = document.getElementById('photos') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input when component initializes
    }
  }
}
