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
    public pHead : HTMLSpanElement;
    public cHead : HTMLSpanElement;
    public rHead : HTMLSpanElement;

    public pHide : Boolean;
    public cHide : Boolean;
    public rHide : Boolean;

    constructor() { }

    ngOnInit() {

        // Setups
        this.pHide = false;
        this.cHide = true;
        this.rHide = true;

        this.resumeDetails = document.getElementById('resume');

    }

    /* *
    *   Display F'ns
    * */
    showProjects () : void  {

        this.resumeDetails.scrollTo(0,0);
        this.pHide = false;
        this.cHide = true;
        this.rHide = true;
    }

    showCerts () : void  {

        this.resumeDetails.scrollTo(0,0);
        this.pHide = true;
        this.cHide = false;
        this.rHide = true;
    }

    showResume () : void  {

        this.pHide = true;  
        this.cHide = true;
        this.rHide = false;


    }

}
