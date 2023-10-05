import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  actorData: any[] = []
  sub: Subscription = new Subscription()
  imagePass: string = 'https://image.tmdb.org/t/p/w500'
  watchList: { movie: any, added: boolean }[] = []
  currentPage: number = 1
  key: string = "person"
  constructor(private _HomeService: HomeService, private router: Router) { }
  ngOnInit(): void {
    this.sub = this._HomeService.getMovies(this.key, 1).subscribe({ next: (data: any) => this.actorData = data.results })
  }
  getMoviesPagination(key: string, page: number) {
    this.sub = this._HomeService.getMovies(this.key, page).subscribe({
      next: (data: any) => this.actorData = data.results,
      error: (error) => console.log(error)
    })
    this.currentPage = page
  }
  redirectToActorDetails(id: number) {
    this.router.navigate(["actorDetails", id])
  }
}
