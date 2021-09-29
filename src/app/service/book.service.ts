import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllbooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`http://localhost:8080/book`);
  }

  getBookById(book_id: number): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8080/book/${book_id}`);
  }

  getBookByName(book_name: String): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8080/book/bookname/${book_name}`);
  }

  sort(num: number): Observable<any>{
    return this.http.get<Book[]>(`http://localhost:8080/book/sort/${num}`);
  }

  changeBookQuantity(book_id:number, quantity:number): Observable<any>{
    const token = localStorage.getItem("token") 
    const params = new HttpParams()
                .set('book_id', book_id)
                .set('quantity', quantity);
    return this.http.post(`http://localhost:8080/book/changequantity/${token}`, params);
  }


}
