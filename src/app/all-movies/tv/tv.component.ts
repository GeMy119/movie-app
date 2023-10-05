import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { OriginalMovie } from '../interface/originalMovie';
import { Subscription } from 'rxjs';
import { Movie } from '../interface/movie';
import { Router } from '@angular/router';
import { FavService } from '../services/fav.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit, OnDestroy {
  tvData: any[] = []
  sub: Subscription = new Subscription()
  imagePass: string = 'https://image.tmdb.org/t/p/w500'
  watchList: { movie: any, added: boolean }[] = []
  faHeart = faHeart
  currentPage: number = 1
  key: string = "tv"
  constructor(private _HomeService: HomeService, private router: Router, private _FavService: FavService) { }
  ngOnInit(): void {
    this.sub = this._HomeService.getMovies("tv", 1).subscribe({ next: (data: Movie) => this.tvData = data.results })
    this.watchList = this._FavService.getWatchList()
  }
  redirectToDetails(id: number) {
    this.router.navigate(["movieDetails", id])
    this._HomeService.setAyHaga(id)
  }
  addToWatchList(movie: OriginalMovie) {
    this._FavService.addToWatchList(movie)
    this.watchList = this._FavService.getWatchList()
    console.log(this.watchList)
  }
  isMovieInWatchList(movie: any): boolean {
    const isInWatchList = this.watchList.some((item: any) => item.movie.id === movie.id);
    return isInWatchList;
  }
  getMoviesPagination(key: string, page: number) {
    this.sub = this._HomeService.getMovies("tv", page).subscribe({
      next: (data: any) => this.tvData = data.results,
      error: (error) => console.log(error)
    })
    this.currentPage = page
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
