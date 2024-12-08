import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  getFilteredArticles(filterParams: any) {
    const baseUrl = 'http://localhost:3000/api/v1/posts';
    let queryParams = '';

    // Dynamically construct query string based on available filter parameters
    if (filterParams.search) {
      queryParams += `search=${encodeURIComponent(filterParams.search)}&`;
    }
    if (filterParams.min) {
      queryParams += `price[gte]=${encodeURIComponent(filterParams.min)}&`;
    }
    if (filterParams.max) {
      queryParams += `price[lte]=${encodeURIComponent(filterParams.max)}&`;
    }
    if (filterParams.sortOrder) {
      queryParams += `sort=${encodeURIComponent(filterParams.sortOrder)}&`;
    }
    if (filterParams.location) {
      queryParams += `location=${encodeURIComponent(filterParams.region)}&`;
    }
    if (filterParams.category) {
      queryParams += `category=${encodeURIComponent(filterParams.category)}&`;
    }
    if (filterParams.gender) {
      queryParams += `gender=${encodeURIComponent(filterParams.gender)}&`;
    }

    queryParams += `page=1&limit=12`;

    const finalUrl = `${baseUrl}?${queryParams}`;
    console.log(finalUrl);
    return this.http.get(finalUrl);
  }

  getAllArticles() {
    return this.http.get('http://localhost:3000/api/v1/posts');
  }

  getSlice(num_de_page: number, limit: number) {
    return this.http.get(
      `http://localhost:3000/api/v1/posts?page=${num_de_page}&&limit=${limit}`
    );
  }

  getBySearch(keyword: string) {
    return this.http.get(
      `http://localhost:3000/api/v1/posts?search=${keyword}`
    );
  }

  getArticle(id: string) {
    return this.http.get(`http://localhost:3000/api/v1/posts/${id}`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  // data is the article data to be posted
  postArticle(data: any): Observable<any> {
    // const token = this.getToken();

    // // Set up headers (Content-Type is not needed for FormData)
    // let headers = new HttpHeaders();
    // if (token) {
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    // }

    // Send FormData to the backend
    return this.http.post('http://localhost:3000/api/v1/posts', data);
  }

  updateArticle(id: string, data: any) {
    return this.http.put(`http://localhost:3000/api/v1/posts/${id}`, data);
  }

  deleteArticle(id: string) {
    return this.http.delete(`http://localhost:3000/api/v1/posts/${id}`);
  }
  // ** users **
  getUsers() {
    return this.http.get('http://localhost:3000/api/v1/users');
  }
  getUser(id: string) {
    return this.http.get(`http://localhost:3000/api/v1/users/${id}`);
  }
  signupuser(data: any) {
    return this.http.post('http://localhost:3000/api/v1/users/signup', data);
  }
  signinuser(data: any) {
    return this.http.post('http://localhost:3000/api/v1/users/login', data);
  }
  signoutuser() {
    return this.http.get('http://localhost:3000/api/v1/users/signout');
  }
  updateme(data: FormData) {
    return this.http.patch('http://localhost:3000/api/v1/users/updateMe', data);
  }
  updatemyPassword(data: any) {
    return this.http.patch(
      'http://localhost:3000/api/v1/users/updateMyPassword',
      data
    );
  }
  deleteme() {
    return this.http.delete('http://localhost:3000/api/v1/users/deleteme');
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/v1/users/forgotPassword`,
      data
    );
  }
  sendContact(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v1/home/contact`, data);
  }
}
