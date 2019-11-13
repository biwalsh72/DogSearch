import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import API_KEY from './api-key';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private api: string = API_KEY.API_KEY.apikey;
  public query: string;
  public videos: any[];
  private url: string;

  constructor(private http: HttpClient) { }

  getDogs(query, maxResults, token): Promise<any> {
    if (token == null) {
    this.url = 'https://www.googleapis.com/youtube/v3/search?key='
    + this.api + '&part=snippet&type=video&q=dog+' + query + '&maxResults=' + maxResults;
    }
    else {
    this.url = 'https://www.googleapis.com/youtube/v3/search?key='
    + this.api + '&part=snippet&type=video&q=dog+' + query + '&maxResults=' + maxResults + "&pageToken=" + token;
    }
    return this.http.get(this.url).toPromise().then((res) => { return res; });
  }

  getVideoObject(videoid: string) : Observable<any> {
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=' + videoid + '&key=' + this.api;
    return this.http.get(url).pipe(map((res) => { return res; }));
  }
}
