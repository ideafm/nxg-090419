import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { IRootStore } from './store/reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuardService implements CanActivate {

  public constructor(
    private router: Router,
    private store: Store<IRootStore>
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const {url} = state;
    return this.store.select('auth', 'isLogged') // isLogged stream
      .pipe(
        take(1),
        switchMap((isLogged: boolean) => {
          if (!isLogged && (url === '/login' || url === '/signup')) {
            return of(true);
          }
          if (isLogged && (url === '/login' || url === '/signup')) {
            this.router.navigate(['/backoffice']);
            return of(false);
          }
          if (!isLogged) {
            this.router.navigate(['/login']);
          }
          return of(isLogged);
        })
      );
  }

}
