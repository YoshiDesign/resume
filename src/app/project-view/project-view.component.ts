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
    private anchored : boolean

    constructor(
        rService : ResumeService
    ) { 
        this.rService = rService
        this.imgAssets = "assets/img/"
        this.linked = null
    }

    ngOnInit() {
        this.buffer = this.rService.buffer
        console.log(this.buffer)
    }

    // Clicked on tech item
    test(e) {
        console.log("test@")
        this.linker(e.target)
        // DISPLAY INFO
    }

    // Hovering over tech item
    highlighter (e) {
        console.log(e.target.id)
        this.linker(e.target.id)
    }

    // Blur tech item
    unhighlight(e) {

    }

    // Connect related tech images
    linker (_id) {

        this.linked = null

        /**
         * Note to self: Why did you use nested arrays?
         * Now nothing is randomly accessible by _id.
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
                // We found that which should have been randomly accessible as a dict key
                if (item[0] == _id) {
                    document.getElementById(_id).style.border = "1px solid white"
                    // Get this item's related projects
                    projects = item[2]
                }

            }
        }

        for ( let item_id in projects ) {
            
        }

        // Using a natural for - so we can reset i
        // for (let i = 0; i < this.buffer.length ; i++) {
        //     for (let j = 0 ; j < this.buffer[i].length ; j++) {
        //         // console.log(`LINKED : ${this.linked}`)
        //         // Get the array of project ids used by this tech-icon
        //         if (this.linked == null) {
        //             if (this.buffer[i][j][0] == _id) {
        //                 this.linked = this.buffer[i][j][2]
        //                 // console.log(`Acquired Link: ${this.linked}`)
        //                 // console.log(this.linked)
        //                 i = 0 // Reset
        //                 break // Now we can determine which icons should be highlighted
        //             }

        //         } else {

        //             // Find all technologies used in projects that include this tech-icons projects
        //             let pass = this.linked.some( // (Ed. ES7)
        //                 (arr) => this.buffer[i][j][2].includes(arr)
        //             )
                    
        //             console.log(`?? ${pass}`)
        //         }
        //     }
        // }
    }

}
