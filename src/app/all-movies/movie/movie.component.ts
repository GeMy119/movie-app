import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { FavService } from '../services/fav.service';
import { Subscription } from 'rxjs';
import { Movie } from '../interface/movie';
import { OriginalMovie } from '../interface/originalMovie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movieData: any[] = []
  sub: Subscription = new Subscription()
  imagePass: string = 'https://image.tmdb.org/t/p/w500'
  watchList: { movie: any, added: boolean }[] = []
  faHeart = faHeart
  currentPage: number = 1
  key: string = "movie"
  constructor(private _HomeService: HomeService, private router: Router, private _FavService: FavService) { }
  ngOnInit(): void {
    this.sub = this._HomeService.getMovies(this.key, 1).subscribe({ next: (data: Movie) => this.movieData = data.results })
    this.watchList = this._FavService.getWatchList()
  }
  redirectToDetails(id: number) {
    this.router.navigate(["movieDetails", id])
    this._HomeService.setAyHaga(id)
  }
  addToWatchList(movie: any) {
    this._FavService.addToWatchList(movie)
    this.watchList = this._FavService.getWatchList()
    console.log(this.watchList)
  }
  isMovieInWatchList(movie: any): boolean {
    const isInWatchList = this.watchList.some((item: any) => item.movie.id === movie.id);
    return isInWatchList;
  }
  getMoviesPagination(key: string, page: number) {
    this.sub = this._HomeService.getMovies("movie", page).subscribe({
      next: (data: any) => this.movieData = data.results,
      error: (error) => console.log(error)
    })
    this.currentPage = page
  }
}

