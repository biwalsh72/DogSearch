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

  showVideo = false;
  url: string;
  videos: any[];
  video: string;
  videoid: string;
  channelid: string;
  channels: any[];
  embedurlSafe: SafeResourceUrl;
  subscription: Subscription;
  private api = API_KEY.API_KEY.apikey;

  constructor(private youtubeservice: YoutubeService, private dataservice: DataService, private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    //subscribes to value change in home component when user clicks on a video and calls changeValue function
    this.subscription = this.dataservice.currentVideo.subscribe(video => this.changeValue(video));
  }

  toggleVideo() {
    this.showVideo = !this.showVideo;
  }

  async onOutside(e: Event) {
    setTimeout(function () {
      this.showVideo = false;
    }, 20);
  }

  //changes embedded player value every time the user selects a video in the home component
  changeValue(video: string) {
    this.videoid = video;
    let embedurl = 'https://www.youtube.com/embed/' + this.videoid + '?autoplay=1';
    this.embedurlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(embedurl);
    this.func();
  }

  //retrieves the full video object of the id retrieved from the home component
  async func() {
    this.videos = [];
    this.youtubeservice
      .getVideoObject(this.videoid)
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }
        this.video = this.videos[0];
        if (this.video !== undefined) {
          this.channel(this.videos[0].snippet.channelId);
        }
      });
  }

  //retrives youtube channel info object from the id provded by the video snippet
  async channel(id: string) {
    this.videos = [];
    this.youtubeservice
      .getChannel(id)
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }
        this.channelid = this.videos[0];
      });
  }

}
