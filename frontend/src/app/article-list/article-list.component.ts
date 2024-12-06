import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../article.interface';
import { SharedService } from '../../services/shared.service';

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
    
}
