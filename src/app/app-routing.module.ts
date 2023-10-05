import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { MovieDetailsComponent } from './all-movies/movie-details/movie-details.component';
import { MovieHomeComponent } from './all-movies/movie-home/movie-home.component';
import { FavMoviesComponent } from './all-movies/fav-movies/fav-movies.component';
import { SearchComponent } from './all-movies/search/search.component';
import { TvComponent } from './all-movies/tv/tv.component';
import { MovieComponent } from './all-movies/movie/movie.component';
import { PeopleComponent } from './all-movies/people/people.component';
import { ActorDetailsComponent } from './all-movies/actor-details/actor-details.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: MovieHomeComponent },
  { path: "movieDetails/:id", component: MovieDetailsComponent },
  { path: "search/:searchVal", component: SearchComponent },
  { path: "favMovies", component: FavMoviesComponent },
  { path: "tv", component: TvComponent },
  { path: "movie", component: MovieComponent },
  { path: "actors", component: PeopleComponent },
  { path: "actorDetails/:id", component: ActorDetailsComponent },
  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
