import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  addToCart(cart:Object): Observable<Object>{
    return this.http.post(`http://localhost:8080/cart/add`, cart)
  }

  getAllCarts(token: String): Observable<any>{
    return this.http.get(`http://localhost:8080/cart/get/${token}`)
  }

  getAllCartBookId(token: String): Observable<any>{
    return this.http.get(`http://localhost:8080/cart/getbooklist/${token}`)
  }

  removeFromCart(cart_id: number): Observable<any> {
    console.log("rem")
    return this.http.delete(`http://localhost:8080/cart/remove/${cart_id}`);
  }

  removeAllCarts(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.delete(`http://localhost:8080/cart/removeall/${token}`);
  }

  changeQuantity(cart_id:number, quantity: number): Observable<any>{
    const token = localStorage.getItem("token");
    const params = new HttpParams()
                .set('cart_id', cart_id)
                .set('quantity', quantity);
    return this.http.put(`http://localhost:8080/cart/update/${token}`, params)
  }
}
