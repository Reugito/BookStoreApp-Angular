import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  order_id: any;
  constructor( private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.order_id =this.route.snapshot.paramMap.get("order_id") || "";

    console.log("---------", this.order_id)
  }

}
