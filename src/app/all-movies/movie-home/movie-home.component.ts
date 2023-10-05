import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../interface/movie';
import { HomeService } from '../services/home.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OriginalMovie } from '../interface/originalMovie';
@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.css']
})
export class MovieHomeComponent implements OnInit, OnDestroy {
  trendingMovie!: OriginalMovie[]
  trendingTv!: any[]
  trendingPeople!: any[]
  topRatedMovies!: any[]
  sub: Subscription = new Subscription()
  currentPage: number=1
  searchVal!: string

  constructor(private _HomeService: HomeService, private router: Router) { }
  ngOnInit() {
    this.sub = this._HomeService.getMovies("movie",1).subscribe({
      next: (data: Movie) => this.trendingMovie = data.results.slice(0,10),
      error: (error) => console.log(error)
    })
    this.sub = this._HomeService.getMovies("tv",1).subscribe({
      next: (data: Movie) => this.trendingTv = data.results.slice(0,10),
      error: (error) => console.log(error)
    })
    this.sub = this._HomeService.getMovies("person",1).subscribe({
      next: (data: Movie) => this.trendingPeople = data.results.slice(0,10),
      error: (error) => console.log(error)
    })
    this.sub = this._HomeService.getTopRatedMovies(1).subscribe({
      next: (data: Movie) => this.topRatedMovies = data.results.slice(0,10),
      error: (error) => console.log(error)
    })
  }
  // getMoviesPagination(page: number) {
  //   this.sub = this._HomeService.getMoviesPagination(page).subscribe({
  //     next: (data: any) => this.trendingMovie = data,
  //     error: (error) => console.log(error)
  //   })
  //   this.currentPage = page
  // }
  searchMovie() {
    this.router.navigate(["search", this.searchVal])
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
