import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { YoutubeService } from '../youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  video: any;
  pageToken: string = null;

  constructor(private spinner: NgxSpinnerService, private youtubeservice: YoutubeService) { }

  //re-search when a new key is pressed
  onKey(event: any) {
    this.query = event.target.value;
    return this.ngOnInit();
  }

  onClick(event: any, id: any) {
    this.video = event.target;
    console.log(this.video);
  }

  loadMoreVideos(event) {
    if (this.pageToken) {
      this.youtubeservice.getDogs(this.query, 10, this.pageToken).then(data => {
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
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
    this.videos = [];
    //FOR QUOTA LIMIT SAKE ONLY CALL FUNCTION WHEN NEEDED
    this.youtubeservice
      .getDogs(this.query,10, this.pageToken)
      .then(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element);
        }
        this.pageToken = lista.nextPageToken;
      });
  }

}
