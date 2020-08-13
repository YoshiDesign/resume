import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'resume';

    public switchPos : number;
    public mode : string;

    constructor(){}

    ngOnInit() {
        this.mode = ""
        this.switchPos = 0
    }

    switchLed () : void {

        if (this.switchPos == 2)
            this.switchPos = 0
        else
            this.switchPos += 1
        
        let nodes = Array.from(document.querySelectorAll('[data-anim]'))
        let modes = Array.from(document.querySelectorAll('[data-mode]'))
        let shows = Array.from(document.querySelectorAll('[data-show]'))
        let splodes = Array.from(document.getElementsByClassName('splodes'))

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
                // Move switch
                document.getElementById('snode').style.left = "16px"
                nodes.forEach(el => {
                    if (!el.classList.contains("stop-anim"))
                        el.classList.add("stop-anim")
                })
                shows.forEach( el  => {
                    el.classList.add('no-op')
                })
                break
            case 2 :
                // Move switch
                document.getElementById('snode').style.left = "32px"
                modes.forEach(el => {
                    if (!el.classList.contains('reds'))
                        el.classList.add('reds')
                })
                let s = Array.from(document.getElementsByClassName('no-op'))
                s.forEach(el => {
                    el.classList.remove('no-op')
                })
                splodes.forEach(el => {
                    
                })
                break
        }

    }

}
