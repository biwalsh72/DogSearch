import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { YoutubeService } from '../youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Dog Search';
  private unsubscribe$: Subject<any> = new Subject();

  videos: any[];
  query: string = '';
  pageToken: string = null;

  video: string;

  constructor(private spinner: NgxSpinnerService, private youtubeservice: YoutubeService, private dataservice: DataService) { }

  //re-search when a new key is pressed
  onSubmit(event: any) {
    this.query = event.target.value;
    return this.ngOnInit();
  }

  onClick(event: any, id: any) {
    this.dataservice.changeVideo(id.id.videoId);
  }

  loadMoreVideos(event) {
    if (this.pageToken) {
      this.youtubeservice.getDogs(this.query, 5, this.pageToken).then(data => {
        if (data) {
          this.pageToken = data.nextPageToken;
          data.items.forEach(video => {
            this.videos.push(video);
          });
        }
      })
    }
  }

  ngOnInit() {
    this.search();
  }

  async search() {
    this.videos = [];
    //FOR QUOTA LIMIT SAKE ONLY CALL FUNCTION WHEN NEEDED
    this.youtubeservice
      .getDogs(this.query,10, this.pageToken)
      .then(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }
        this.dataservice.changeVideo(this.videos[0].id.videoId);
        this.pageToken = lista.nextPageToken;
      });
  }

}
