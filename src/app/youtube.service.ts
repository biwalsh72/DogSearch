import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import API_KEY from './api-key';
import { Video } from './home/video.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private api: string = API_KEY.API_KEY.apikey;
  private url: string = 'https://www.googleapis.com/youtube/v3/search?key=' + this.api + '&part=snippet&type=video&q=dog'

  constructor(private http: HttpClient) { }

  getDogs(maxResults): Observable<Object> {
    return this.http.get(this.url)
      .pipe(map((res) => {
        return res;
      }))
  }
}
