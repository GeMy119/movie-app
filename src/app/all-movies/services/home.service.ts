import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  ayHaga!: any

  constructor(private http: HttpClient) {
    this.ayHaga = new BehaviorSubject({})
  }

  getMovies(key:string ,page:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/trending/${key}/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4&page=${page}`)
  }
  getActors(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/trending/person/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4`)
  }
  getTopRatedMovies(page:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4&page=${page}`)
  }
  getOneMovie(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4`)
  }
  getRecommendations(id: number ,page:number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4&page=${page}`)
  }
  serchMovies(searchVal: string, page: number) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4&page=${page}&query=${searchVal}`)
  }
  getActorMovies(id: number, startIndex: number, endIndex: number) {
    return this.http.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4`)
  }
  getActorDetais(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0NyLxRd7CsJUETmb0bfKibGO5Sy0JNx8HNLu9miaEPxNhokJgF7MtyAg4`)
  }
  getAyHaga() {
    return this.ayHaga.asObservable()
  }
  setAyHaga(id: any) {
    this.ayHaga.next(id)

  }
}
