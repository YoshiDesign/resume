import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../services/PreviewService'

@Component({
  selector: 'app-social-view',
  templateUrl: './social-view.component.html',
  styleUrls: ['./social-view.component.css']
})
export class SocialViewComponent implements OnInit {

    public current_preview : number
    

  constructor() { }

  ngOnInit() {
  }

}
