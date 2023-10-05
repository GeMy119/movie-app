import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavService } from '../services/fav.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

ActivatedRoute
@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  actorMovies: any = []
  actorDetails!: any
  id!: number
  watchList!: any
  faHeart = faHeart
  imagePass: string = 'https://image.tmdb.org/t/p/w500'
  maxLenght!: number
  constructor(private router: Router, private _HomeService: HomeService, private active: ActivatedRoute, private _FavService: FavService) { }
  ngOnInit(): void {
    this.id = this.active.snapshot.params['id'];
    this._HomeService.getActorDetais(this.id).subscribe({
      next: (data: any) => this.actorDetails = data
    })
    this._HomeService.getActorMovies(this.id, 0, 0).subscribe({
      next: (data: any) => {
        this.maxLenght = data.cast.length,
          this.actorMovies = data.cast.sort((a: any, b: any) => b.vote_average - a.vote_average).slice(0, 24)
        console.log(this.maxLenght)
        console.log(this.actorMovies.length)
      }
    })
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
  seeMore() {
    const startIndex = this.actorMovies.length;
    const endIndex = startIndex + 25;
    this._HomeService.getActorMovies(this.id, startIndex, endIndex).subscribe({
      next: (data: any) => {
        this.actorMovies.push(...data.cast.sort((a:any,b:any)=>b.vote_average-a.vote_average).slice(startIndex, endIndex));
      }
    });
  }
}
