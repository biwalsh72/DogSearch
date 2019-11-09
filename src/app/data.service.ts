import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private video = new BehaviorSubject<string>('default value');
  currentVideo = this.getCurrentVideo();

  constructor() { }

  changeVideo(id: string) {
    this.video.next(id);
  }

  getCurrentVideo() : Observable<string> {
    return this.video.asObservable();
  }
}
