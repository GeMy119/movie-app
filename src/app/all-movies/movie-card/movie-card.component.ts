import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from '../services/home.service';
import { OriginalMovie } from '../interface/originalMovie';
import { FavService } from '../services/fav.service';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() trendingMovie!: OriginalMovie[];
  @Input() trendingTv!: any[];
  @Input() trendingPeople!: any[];
  @Input() topRatedMovies!: OriginalMovie[];
  faHeart = faHeart
  watchList: { movie: OriginalMovie, added: boolean }[] = []
  imagePass: string = 'https://image.tmdb.org/t/p/w500'
  constructor(private router: Router, private _HomeService: HomeService, private _FavService: FavService) { }
  ngOnInit(): void {
    this.watchList = this._FavService.getWatchList()
  }
  
  redirectToActorDetails(id: number) {
    this.router.navigate(["actorDetails", id])
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
    const isInWatchList = this.watchList.some((item:any) => item.movie.id === movie.id);
    return isInWatchList;
  }
}