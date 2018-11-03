import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatelogService } from '../catelog.service';
import { finalize } from 'rxjs/operators';
import { CockTail } from '../cocktail.modal';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss']
})
export class CocktailDetailComponent implements OnInit {

  cocktailId: number;
  isLoading: boolean;
  cockTail: CockTail;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private catelogService: CatelogService) { }

  ngOnInit() {
    this.cockTail = new CockTail();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.cocktailId = params['id'];
        this.loadCockTailDetails(this.cocktailId);
      }
    });
  }

  loadCockTailDetails(id: number) {
    this.isLoading = true;
    this.catelogService.getCockTailDetail('i=' + id)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response: any) => {
        if (response.drinks != null && response.drinks.length > 0) {
          this.cockTail = response.drinks[0];
        }
      });
  }

}
