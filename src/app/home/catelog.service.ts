import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHelperService } from '@app/shared/httpservice.service';
import { environment } from '@env/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CatelogService {

  endPointUrl: string;
  constructor(private httpService: HttpHelperService) {
    this.endPointUrl = environment.endPointUrl;
  }

  // get Cocktail  and return as observable
   getCockTails(obj: string): Observable<any> {
     return  this.httpService.get(this.endPointUrl, environment.endPoints.cocktailUrl + obj, false)
      .pipe(map((data: any) => data),
        catchError(() => of('Error, could not load cocktails :-('))
      );
  }

  // get Cocktail details and return as observable
  getCockTailDetail(obj: string): Observable<any> {
    return this.httpService.get(this.endPointUrl, environment.endPoints.detailLookupUrl + obj, false)
      .pipe(map((data: any) => data),
        catchError(() => of('Error, could not load cocktails :-('))
      );
  }
  
}
