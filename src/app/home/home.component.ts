import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import API_KEY from '../api-key';
import { Video } from '../home/video.model'
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Dog Search';

  constructor() { }

}
