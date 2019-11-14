import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import API_KEY from './api-key';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private api: string = API_KEY.API_KEY.apikey; //MUST PROVIDE YOUR OWN KEY WHEN RUNNING
  public query: string;
  public videos: any[];
  private url: string;

  constructor(private http: HttpClient) {}

  //API_KEY is saved on local file and .gitignored so that it cannot be accessed

  //retrieve list of videos under the query 'dog' (by default) and return promise object
  //switched to Promise from observable for token switching
  //for more info go to: https://developers.google.com/youtube/v3/docs/search/list
  getDogs(query, maxResults, token): Promise < any > {
    if (token == null) {
      this.url = 'https://www.googleapis.com/youtube/v3/search?key=' +
        this.api + '&part=snippet&type=video&q=dog+' + query + '&maxResults=' + maxResults;
    } else {
      this.url = 'https://www.googleapis.com/youtube/v3/search?key=' +
        this.api + '&part=snippet&type=video&q=dog+' + query + '&maxResults=' + maxResults + "&pageToken=" + token;
    }
    return this.http.get(this.url).toPromise().then((res) => {
      return res;
    });
  }

  //return observable object of specific youtube video using its ID
  //for more info go to: https://developers.google.com/youtube/v3/docs/videos/list
  getVideoObject(videoid: string): Observable < any > {
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=' + videoid + '&key=' + this.api;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }

  //return observable object of specific youtube channel using its ID
  //for more info go to: https://developers.google.com/youtube/v3/docs/channels/list
  getChannel(channelId: string): Observable < any > {
    let url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=' + channelId + '&key=' + this.api;
    return this.http.get(url).pipe(map((res) => {
      return res;
    }));
  }
}
