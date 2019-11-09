import { Component, OnInit, SecurityContext } from '@angular/core';
import { DataService } from '../data.service';
import { YoutubeService } from '../youtube.service';
import API_KEY from '../api-key';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  url: string;
  videos: any[];
  video: string;
  videoid: string;
  embedurlSafe: SafeResourceUrl;
  subscription: Subscription;
  private api = API_KEY.API_KEY.apikey;

  constructor(private youtubeservice: YoutubeService, private dataservice: DataService, private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.subscription = this.dataservice.currentVideo.subscribe(video => this.changeValue(video));
  }

  changeValue(video: string) {
    this.videoid = video;
    let embedurl = 'https://www.youtube.com/embed/' + this.videoid + '?autoplay=1';
    this.embedurlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(embedurl);
    this.func();
  }

  async func() {
    this.videos = [];
    this.youtubeservice
    .getVideoObject(this.videoid)
    .subscribe(lista => {
      for (let element of lista["items"]) {
        this.videos.push(element);
      }
      this.video = this.videos[0];
    });
  }

}
