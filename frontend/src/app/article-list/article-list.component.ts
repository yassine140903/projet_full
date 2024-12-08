import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../article.interface';
import { SharedService } from '../../services/shared.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent {

  indexStart: number = 0;
  indexSliceLength: number = 5;
  indexEnd: number = this.indexStart + this.indexSliceLength;
  pageIndices: number[] = [];
  sub_pageIndices: number[] = [];
  i : number = 1;

  articles: Article[] = [];

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.sharedService.getSlice(1, 12).subscribe((res: any) => {
      if (res && res.data && res.data.posts) {
        this.articles = res.data.posts;
        
        this.pageIndices = Array(
          res.totalPages
        )
          .fill(0)
          .map((_, i) => i+1);
  
        //this.articleSlice();
        this.indexSlice();
        window.addEventListener('filterParamsUpdated', () => this.fetchFilteredArticles());
      }
    });
  }

  getSlice(num_de_page :number){
    this.sharedService.getSlice(num_de_page, 12).subscribe((res: any) => {
      if (res && res.data && res.data.posts) {
        this.articles = res.data.posts;
      };})
  };

  indexSlice() {
    this.sub_pageIndices = this.pageIndices.slice(this.indexStart, this.indexEnd);
  }

  getNextIndexSlice() {
    this.indexStart += this.indexSliceLength;
    this.indexEnd += this.indexSliceLength;
    this.indexSlice();
  }
  getPrevIndexSlice() {
    this.indexStart -= this.indexSliceLength;
    this.indexEnd -= this.indexSliceLength;
    this.indexSlice();
  }

  onArticleClick(article: Article) {
    this.router.navigate(['/product', article._id]);
  }

  public isFilterVisible: boolean = false;

  // Show the filter
  popUpFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if(this.isFilterVisible)
          this.isFilterVisible = false;
      }
    });
  }

  closeFilter() {
    this.isFilterVisible = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }


  /* ########
  HTTP REQUEST
   ##########*/

  /*searchArticles() {
    if(this.searchInput){
      this.sharedService.getBySearch(this.searchInput).subscribe((res: any) => {
        if (res && res.data && res.data.posts) {
          console.log(res.data.posts);
          }
        }
      )
    }
  }*/

    fetchFilteredArticles() {
      const filterParams = localStorage.getItem('filterParams');
      if (filterParams) {
        const parsedParams = JSON.parse(filterParams);

        // Fetch articles with updated filter parameters
        this.sharedService.getFilteredArticles(parsedParams).subscribe({
     
            next: (res: any) => {
              if (res && res.data && res.data.posts) {
                this.articles = res.data.posts;
                this.closeFilter();
        
                this.pageIndices = Array(
                  res.totalPages
                )
                  .fill(0)
                  .map((_, i) => i + 1);
        
                this.indexSlice();
              }
            },
            error: (err) => {
              console.log("hedha error ml filter storage", err);
            }
       });
      }
    }

    searchInput= '';
    min = '';
    max = '';
    sortOrder = '';
    selectedLocation = '';
    selectedCategory = '';
    gender = '';
    filterParams = {
      search: this.searchInput,
      min: this.min,
      max: this.max,
      region: this.selectedLocation,
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
      { type: '-------', items: ['Other'] },
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
      
      if ((this.min === null && this.max === null) ||
      (this.min && this.max && Number(this.min) <= Number(this.max))){
        minElement?.style.setProperty("border", "0.1px solid #000");
        minElement?.style.setProperty("color", "#000");
        maxElement?.style.setProperty("border", "0.1px solid #000");
        maxElement?.style.setProperty("color", "#000");
        return true;
      }
        
      if (this.min && isNaN(Number(this.min))) {
        minElement?.style.setProperty("border", "2px dashed red");
        minElement?.style.setProperty("color", "red");
        return false;
      }else {
        minElement?.style.setProperty("border", "0.1px solid #000");
        minElement?.style.setProperty("color", "#000");
  
        if (this.max && isNaN(Number(this.max))) {
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
        if (this.min) {
          filterParams.min = this.min;
        }
  
        if (this.max) {
          filterParams.max = this.max;
        }
  
        if (this.searchInput) {
          filterParams.search = this.searchInput;
        }
      
        if (this.sortOrder) {
          filterParams.sortOrder = this.sortOrder;
        }
  
        if (this.selectedLocation) {
          filterParams.location = this.selectedLocation;
        }
      
        if (this.selectedCategory) {
          filterParams.category = this.selectedCategory;
        }
      
        if (this.gender) {
          filterParams.gender = this.gender;
        }
      
        // Now we have the filterParams object ready with only the valid attributes.
        if(this.verifInput()){
          //HERE USE LOCAL_STORAGE BRO:
          localStorage.setItem('filterParams', JSON.stringify(filterParams));
          console.log(filterParams);
  
          // Optionally, notify other components about the filter change
          window.dispatchEvent(new Event('filterParamsUpdated'));
          console.log("mnadham b3athtlak");
        }
    }
    
}
