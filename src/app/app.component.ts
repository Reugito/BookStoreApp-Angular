import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Book } from './book';
import { BookService } from './service/book.service';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStoreApp-Angular';
  bookIdLIst: number[] =[]
  token = localStorage.getItem("token") || null;
  constructor(private bookService: BookService, private cartService: CartService, 
                    private router: Router) {
                      
                    }
  
  ngOnInit(): void {
    if(this.token != null){
      this.getBookIdLIst();
      this.reloadData()
    }

  }

  reloadData(){
    this.bookService.getAllbooks().subscribe((data:Book[]) =>{
      this.books = data;
    })
  }

  getBookIdLIst(){
    this.cartService.getAllCartBookId(localStorage.getItem("token") || "").subscribe(data => {
      this.bookIdLIst = data;
    })
  }

  books!: Book[];
  stateCtrl = new FormControl();
  filteredStates!: Observable< Book[]>;

  private _filterStates(value: string): Book[] {
    const filterValue = value.toLowerCase();

    return this.books.filter(book => book.name.toLowerCase().includes(filterValue));
  }
search = ""
  ong(str: string){
    console.log("<<<<<<<=======>",str)
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.books.slice())
    );

    if(this.stateCtrl.value != null){
      this.router.navigate(['/home',str])
    }

  }

}
