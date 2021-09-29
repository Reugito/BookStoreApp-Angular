import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books!: Book[];
  bookIdLIst: number[] = []
  sold = "OUT OF STOCK"
  bookName:any

  constructor(private bookService: BookService, private router: Router, private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bookName =  this.route.snapshot.paramMap.get('name') || null
    if(this.bookName != null){
      this.bookService.getBookByName(this.bookName).subscribe(data =>{
        this.books = data
        this.ngOnInit()
      })
    }else{
      this.getBookIdLIst()
      this.backToLOginPage();
      this.reloadData();
    }
   

  }

  reloadData(){
    this.bookService.getAllbooks().subscribe((data:Book[]) =>{
      this.books = data;
    })
  }
 
  getBookIdLIst(){
    this.cartService.getAllCartBookId(localStorage.getItem("token") || "").subscribe(data => this.bookIdLIst = data)
  }

  addToCart(book_id: number){
    var cartDTO = {"quantity": 1, "user_id": localStorage.getItem("token"), "book_id": book_id}
    this.cartService.addToCart(cartDTO).subscribe() 
    setTimeout(() =>{this.ngOnInit()},300)
  }

  backToLOginPage(){
    const token = localStorage.getItem("token");
    if(token == null){
      this.router.navigate(['']);
      
    } 
  }

  Onsort(num:number){
      this.bookService.sort(num).subscribe(data =>{this.books = data; })
  }
}
