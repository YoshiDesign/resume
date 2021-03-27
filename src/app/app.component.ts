import { Component, OnInit } from '@angular/core';
import windowResize, { DESKTOP, MOBILE, MOBILE_SCREEN_SIZE } from './Helpers/WindowResize'
import { wrapEvent } from './Helpers/Helpers' 
import { PreviewService } from './services/PreviewService'
import FactoryService from './services/FactoryService'


const PROJECTS = "projects"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
export class AppComponent implements OnInit {
    title = 'resume';

    public switchPos : number
    public mode : string

    private isMobile : boolean = false
    private isDesktop : boolean = false
    private data : any
    private currentDeviceScale

    fService : FactoryService
    pService : PreviewService

    constructor(
        FactoryService : FactoryService,
        PreviewService : PreviewService
    ){  

        this.fService = FactoryService
        this.pService = PreviewService
        this.data = this.pService.Descriptions.default
        
        // Tip: windowResize is a cheap function
        this.isDesktop = window.innerWidth > MOBILE_SCREEN_SIZE ? true : false
        this.isMobile = !this.isDesktop

    }

    ngOnInit() {
        this.mode = ""
        this.switchPos = 0

        // Integrating the browser's "back" button for previews
        window.onpopstate = (e) => {

            let lastURL = new URL(window.location.href)
            let lastPreview = lastURL.searchParams.get('page')

            // Routing
            if (!lastPreview) this.fService.buildToC()
            if (lastPreview) this.fService.selectPreview(lastPreview)

        };

    }

    ngAfterViewInit() {

        // Window resize event listener + binding
        window.onresize = wrapEvent(windowResize, this.isMobile, this.isDesktop, this.fService)

        // Check the URL for queries
        let url = new URL(window.location.href)
        let q = url.searchParams.get('page')

        if(q != null) {
            this.fService.selectPreview(q)
        }
        
    }

    // [!] Frequently executed - Use cautiously [!]
    ngAfterContentChecked() {

        if (window.innerWidth <= MOBILE_SCREEN_SIZE) {
            this.isDesktop = false
            this.isMobile = true
            
        } else {
            this.isDesktop = true
            this.isMobile = false
        
        }
    }

    // Arm the exploding header switch -- TODO - Move the implementation to separate file, perhaps
    switchLed () : void {

        if (this.switchPos == 2)
            this.switchPos = 0
        else
            this.switchPos += 1
        
        let nodes = Array.from(document.querySelectorAll('[data-anim]'))
        let modes = Array.from(document.querySelectorAll('[data-mode]'))
        let shows = Array.from(document.querySelectorAll('[data-show]'))
        let explodes = Array.from(document.getElementsByClassName('explodes'))

        // Determine the interactive switch's effect
        switch (this.switchPos) {
            case 0 :
                // Move switch
                document.getElementById('snode').style.left = "0"
                nodes.forEach(el => {
                    if (el.classList.contains("stop-anim"))
                        el.classList.remove("stop-anim")
                })
                modes.forEach(el => {
                    if (el.classList.contains('reds'))
                        el.classList.remove('reds')
                })
                break
                
            case 1 :
                // Stop the gears
                document.getElementById('snode').style.left = "17px"
                nodes.forEach(el => {
                    if (!el.classList.contains("stop-anim"))
                        el.classList.add("stop-anim")
                })
                shows.forEach( el  => {
                    el.classList.add('no-op')
                })
                break

            case 2 :
                // Blow up the circuit
                document.getElementById('snode').style.left = "32px"
                modes.forEach(el => {
                    if (!el.classList.contains('reds'))
                        el.classList.add('reds')

                })

                // Translates NodeList into array of elements so we can use forEach
                let s = Array.from(document.getElementsByClassName('no-op'))
                s.forEach(el => {
                    // set opacity to 1
                    el.classList.remove('no-op')

                })

                // Blow up the header
                explodes.forEach(el => {
                    // Randomly assign 1 of any 4 randomly determined directions each animated class
                    let mod = Math.random() * 100
                    if (mod > 50) {
                        if (mod < 77) {
                            el.classList.add('explode-1')
                            el.classList.add('end')
                        } else {
                            el.classList.add('explode-2')
                            el.classList.add('end')
                        }

                    } else {
                        if (mod < 27) {
                            el.classList.add('explode-3')
                            el.classList.add('end')
                        } else {
                            el.classList.add('explode-4')
                            el.classList.add('end')
                        }

                    }

                    // Clean up the header
                    setTimeout(function(){

                        el.classList.add('hide-me')

                        document.getElementById('togg').style.display = "none";
                        document.getElementById('nb').style.display = "none";
                        document.getElementById('im').style.display = "none";
                        document.getElementById('error').classList.remove('hide-me')
                        document.getElementById('nb').classList.remove('auto-mg')
                        document.getElementById('nb').classList.add('sm-mg')

                    }, 600)

                })
                break
        }

    }

}
