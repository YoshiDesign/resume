import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../services/PreviewService'
import FactoryService from '../services/FactoryService';

@Component({
  selector: 'app-social-view',
  templateUrl: './social-view.component.html',
  styleUrls: ['./social-view.component.css'],
  providers: [PreviewService, FactoryService]
})
export class SocialViewComponent implements OnInit {

    // Watches URLs and builds appropriate previews
    FactoryService : FactoryService;
    PreviewService : PreviewService
    data : any
    public reset : boolean
    public categories

    // public current_preview : string
    public current_core_tech : Array <string>
    
    constructor(PreviewService : PreviewService, FactoryService : FactoryService) { 
        this.FactoryService = FactoryService
        this.PreviewService = PreviewService
        this.reset = false

        // this.categories = this.FactoryService.getCategories;
    }

    ngOnInit() {


        this.FactoryService.buildToC()
        // console.log(this.categories)

        // Hide the arrow on ToC once it's scrolled
        document.getElementById('previews').addEventListener('scroll', function(){
            document.getElementById('da').style.display = "none";
        })

        // Closes preview windows
        document.getElementById("X").addEventListener('click', e => {
            // document.getElementById('p-window-title').classList.remove('hide-me')
            document.getElementById('preview-tech').classList.add('hide-me')
            Array.from(document.getElementsByClassName('tech-section')).forEach( el => {
                el.classList.remove('hide-me')
            })
            
            // Reset the URL
            this.FactoryService.resetURL()

        })


    }


}
