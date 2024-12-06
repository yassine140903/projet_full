import { Component, Input } from '@angular/core';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() article : Article = {
    _id: "",
    title: "",
    description: "",
    price: 0,
    images: [],
    category: "",
    createdAt: "",
    createdBy: {_id : "", username : "", image : "", phoneNumber: ""},
    location: "",
  }
}
