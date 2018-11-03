import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { finalize, map, catchError } from 'rxjs/operators';
import { CatelogService } from './catelog.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {

  quote: string;
  isLoading: boolean;
  loaderActivate: boolean;
  is_disabledscroll: boolean;
  cocktails: any[];
  cockTail: any;
  query:any;
  // tslint:disable-next-line:no-inferrable-types
  startAt: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  endAt: number = 20;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  constructor(private router: Router, private catelogService: CatelogService) {
    this.loadCockTails();
   }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // Accorning to the scroll load the items..
  onScroll() {
    // tslint:disable-next-line:prefer-const
    let element = this.myScrollContainer.nativeElement;
    // tslint:disable-next-line:prefer-const
    let atbottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.endAt <= this.cocktails.length) {
      if (this.is_disabledscroll && atbottom) {
        this.loaderActivate = true;
        setTimeout(() => { this.endAt += 8; }, 300);
        this.ngOnInit();
        this.is_disabledscroll = false;
      } else {
        this.is_disabledscroll = true;
        this.loaderActivate = true;
      }
    } else {
      this.loaderActivate = false;
    }
  }

  scrollToBottom() {
    try {
      // tslint:disable-next-line:no-unused-expression
      this.myScrollContainer.nativeElement.scrollTop;
    } catch (err) {

    }
  }

  // Load the Details View
  callToDetailsViewTab(id: number) {
    this.router.navigate(['/cocktaildetail', id ]);
  }


  //loading cocktail data
  loadCockTails() {
    // this API will return the collection of
    // "strDrink": "Tuxedo Cocktail",
    // "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/4u0nbl1504352551.jpg",
    // "idDrink": "12420"
    this.isLoading = true;
    this.catelogService.getCockTails('g=Cocktail_glass')
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response) => {
        if (response.drinks != null) {
          this.cocktails = response.drinks;
        }
      });
  }


}
