import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private video = new BehaviorSubject<string>('default value');
  currentVideo = this.getCurrentVideo();

  constructor() { }

  //update behaviorsubject value and notify all subscribers
  changeVideo(id: string) {
    this.video.next(id);
  }

  //return the current behavior subject value as an observable to be used in component functions
  getCurrentVideo() : Observable<string> {
    return this.video.asObservable();
  }
}
