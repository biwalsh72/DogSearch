import { Component, OnInit, SecurityContext } from '@angular/core';
import { DataService } from '../data.service';
import API_KEY from '../api-key';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  videoid: string;
  embedurlSafe : SafeResourceUrl;
  subscription: Subscription;
  private api = API_KEY.API_KEY.apikey;

  constructor(private dataservice: DataService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subscription = this.dataservice.currentVideo.subscribe(video => this.changeValue(video));
  }

  changeValue(video: string) {
    this.videoid = video;
    let embedurl = 'https://www.youtube.com/embed/' + this.videoid + '?autoplay=1';
    this.embedurlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(embedurl);
  }

}
