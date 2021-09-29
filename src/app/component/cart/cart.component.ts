import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  formGroup !: FormGroup;
  type= ""
  totalPrice = 0;
  bookIdLIst:number[] = []
  orderId = 0;
  bookQuantity = 1;
 
 

  carts!:any;
  constructor(private bookService: BookService, private cartService: CartService, private formBuilder: FormBuilder, private orderService: OrderService) {}
  
  token = localStorage.getItem("token") || "";
  
  ngOnInit(): void {
    this.getBookIdLIst();
    this.onReload();
    // this.initForm();
  }

  getBookIdLIst(){
    this.cartService.getAllCartBookId(localStorage.getItem("token") || "").subscribe(data => {
      this.bookIdLIst = data;
    })
  }

  
  types: string[] = ['Home', 'Work', 'Others'];
  initForm(){
    this.formGroup = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      phone_no: new FormControl('', Validators.required),
      pin_code: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      landmark: new FormControl('', Validators.required),
      type: new FormControl('')
    })
  }

  onSubmit(){
    this.orderService.placeOrder(this.formGroup.value).subscribe(data => {
      this.orderId = data.data.order_id;
      console.log("=====>", data.data.order_id)
    });
    this.checkout = ! this.checkout;
    this.continue = ! this.continue
 
  }

  onReload(){
    this.cartService.getAllCarts(this.token).subscribe(data => {this.carts = data})
  }

  onRemove(cart_id: number){
    this.cartService.removeFromCart(cart_id).subscribe(data => this.onReload());
    
  }
  custDetails = false;
  onPlaceOrder(){
    this.custDetails = !this.custDetails
    this.initForm();
  }

  plus(cart_id: number, quantity: number, book_id:number){
    if(this.bookQuantity != 0){
      this.cartService.changeQuantity(cart_id, quantity+1).subscribe(data => this.onReload());
      this.changeBookQuantity(book_id, -1)
    }
    
  }

  minus(cart_id: number, quantity: number, book_id:number){
    if(quantity != 0 ){
      this.cartService.changeQuantity(cart_id, quantity-1).subscribe(data =>{this.onReload();});
      this.changeBookQuantity(book_id, 1)

    } 
  }

  changeBookQuantity(book_id: number, quantity: number){
    this.bookService.changeBookQuantity(book_id, quantity).subscribe(data =>{
      this.bookQuantity = data.data.quantity
    })
  }

  continue = false;
  checkout = false;
  onContinue(){
    console.log("hello")
    this.continue = !this.continue
  }

  onRemoveAll(){
    this.cartService.removeAllCarts().subscribe()
  
  }

}

