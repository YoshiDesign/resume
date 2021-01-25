import { Component, OnInit, ClassProvider } from '@angular/core';
import { ResumeService } from '../services/ResumeService'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

    rService : ResumeService
    imgAssets : string

    /**
     * Dev's Note:
     * Arguably, the only way you should ever have to silence the 
     * TS typesystem is to cast variable to type "any".
     * Type inference shouldn't be omitted for perfect type safety.
     */
    public buffer   : any    = []   // Constructs the frontend icons
    private linked  : any    = []   // Array of currently linked icons
    public projTree : object = {}
    private curHighlight : boolean

    constructor(
        rService : ResumeService
    ) { 
        this.rService = rService
        this.imgAssets = "assets/img/"
        this.linked = null
        this.curHighlight = null
    }

    ngOnInit() {
        this.buffer = this.rService.buffer
        console.log(this.buffer)
    }

    // Clicked on tech item
    test(e) :void {
        console.log("test@")
        this.linker(e.target)
        // DISPLAY INFO
    }

    // Hovering over tech item
    highlighter (e) :void {
        this.linker(e.target.id)
        this.curHighlight = e.target.id
        console.log(`Cur Highlight: ${this.curHighlight}`)
    }

    // Blur tech item
    unhighlight(e) :void {
        for (let p of this.linked) {
            document.getElementById(p).classList.remove('slt')
        }
        document.getElementById(e.target.id).classList.remove('hlt')
    }

    // Connect related tech images
    linker (_id) :void {

        this.linked = null

        /**
         * Note to self: Why did you use nested arrays?
         * Now nothing is randomly accessible by _id. Try an assoc. obj instead!
         * Not to worry, but it's not scalable!
         * Ya dingus
         */

        /**
         *  buffer =
         *  [
         *      // Category // e.g. "Languages"
         *      [0] : [ // Items in category
         *          [ "item", "item.png", [P1,P2,P3] ],
         *          [...],
         *          [...]
         *      ],
         *      [1] : ... // Frameworks,
         *      [2] : ... // Libs,
         *      [3] : ... // Other,
         *      [4] : ... // IoT
         * 
         *  ]
         */
        
        let projects;

        // Since I cant access by id... find the projects
        // which are living in the same array as the given id
        for (let type of this.buffer) {
            for (let item of type) {
                // We found the id which should have been randomly accessible as a dict key
                if (item[0] == _id) {
                    document.getElementById(_id).classList.add('hlt')
                    // Get this item's related projects
                    projects = item[2]
                }

            }
        }
        
        // Get an array of all image id's which share this tech's projects
        this.linked = this.connectProjects(projects)

        for (let p of this.linked) {
            document.getElementById(p).classList.add('slt')
        }
    }

    loadTech(e) :void {
        console.log("click")
        
    }

    // Get an array of projects with similar tech
    connectProjects(projects) :Array<number> {

        let all_shared = [];

        for (let category of this.buffer) {

            for (let item of category) {
                let cur_id = item[0]
                let found = projects.some(r => item[2].includes(r))
                if (found) {
                    all_shared.push(cur_id)
                }
            }
        }
        return all_shared

    }

}
