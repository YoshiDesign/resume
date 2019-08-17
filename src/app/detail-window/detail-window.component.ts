import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-window',
  templateUrl: './detail-window.component.html',
  styleUrls: ['./detail-window.component.scss']
})
export class DetailWindowComponent implements OnInit {

  public projectDetails : HTMLElement;
  public certifiDetails : HTMLElement;
  public resumeDetails  : HTMLElement;

  constructor() { }

  ngOnInit() {
    this.projectDetails = document.getElementById('projects');
    this.certifiDetails = document.getElementById('certs');
    this.resumeDetails  = document.getElementById('resume');
  }



}
