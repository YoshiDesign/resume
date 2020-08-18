import { Component, OnInit, ClassProvider } from '@angular/core';
import { ResumeService } from '../services/ResumeService'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

    rService : ResumeService

    constructor(
        rService : ResumeService
    ) { 
        this.rService = rService
    }

    ngOnInit() {

    }

}
