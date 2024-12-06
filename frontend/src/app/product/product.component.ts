import { Component} from '@angular/core';
import { Article } from '../article.interface';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductPageComponent {
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  currentImageIndex = 0;

  article: Article | null = null;
  mainImage: string | undefined = undefined;
  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('articleId');
      if (articleId) {
        // Use shared service to fetch article from API
        this.sharedService.getArticle(articleId).subscribe(
          (res: any) => {
            this.article = res.data.post;
            this.mainImage = this.article?.images[0];
          },
          (error) => {
            console.error('Failed to fetch article:', error);
          }
        );
      }
  }

  setMainImage(image: string) {
    this.mainImage = image;
  }

  BuyNow() {
    //console.log('Product added to cart:', this.product.name);
  }

  nextImage() {
    if(this.article){
      this.currentImageIndex = (this.currentImageIndex + 1) % this.article.images.length;
      this.mainImage = this.article.images[this.currentImageIndex];
    }
  }
  previousImage() {
    if(this.article){
      this.currentImageIndex = (this.currentImageIndex - 1 + this.article.images.length) % this.article.images.length;
      this.mainImage = this.article.images[this.currentImageIndex];
    }
  }
}
