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

    unhighlight(e) {

    }

    // Connect related tech images
    linker (_id) {

        this.linked = null

        console.log(`Linking ${_id}`)
        for (let type of this.buffer) {
            for (let item of type) {
                if (item[0] == _id) {

                }

            }
        }

        // Using a natural for - so we can reset i
        for (let i = 0; i < this.buffer.length ; i++) {
            for (let j = 0 ; j < this.buffer[i].length ; j++) {
                console.log(`LINKED : ${this.linked}`)
                // Get the array of project ids used by this tech-icon
                if (this.linked == null) {
                    if (this.buffer[i][j][0] == _id) {
                        this.linked = this.buffer[i][j][2]
                        console.log(`Acquired Link: ${this.linked}`)
                        console.log(this.linked)
                        i = 0 // Reset
                        break // Now we can determine which icons should be highlighted
                    }

                } else {

                    // Find all technolog7ies used in projects that include this tech-icons projects
                    let pass = this.linked.some( // (Ed. ES7)
                        (arr) => this.buffer[i][j][2].includes(arr)
                    )

                    console.log(`?? ${pass}`)
                }
            }
        }
    }

}
