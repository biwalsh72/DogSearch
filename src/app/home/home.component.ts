import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import API_KEY from '../api-key';
import { Video } from '../home/video.model'
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

  constructor(private spinner: NgxSpinnerService, private youtubeservice: YoutubeService) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
    this.videos = [];
    this.youtubeservice
      .getDogs(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }
      })
  }

}