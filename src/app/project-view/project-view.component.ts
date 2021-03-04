import { Component, OnInit, ClassProvider } from '@angular/core';
import { ResumeService } from '../services/ResumeService'
import { PreviewService } from '../services/PreviewService'

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  providers: [ResumeService, PreviewService]
})
export class ProjectViewComponent implements OnInit {

    ResumeService : ResumeService
    PreviewService : PreviewService
    imgAssets : string

    public buffer   : any    = []   // Constructs the frontend icons
    public projTree : object = {}
    public projects 
    
    private anchored : boolean
    private linked  : any    = []   // Array of currently linked icons
    private curHighlight : string
    private curSelection : string
    
    constructor(
        ResumeService : ResumeService,
        PreviewService : PreviewService
    ) { 
        // A project was selected
        this.anchored = false

        this.ResumeService = ResumeService
        this.PreviewService = PreviewService
        this.imgAssets = "assets/img/"
        this.linked = null
        this.curHighlight = null
        this.curSelection = null
    }

    ngOnInit() {
        this.buffer = this.ResumeService.skillet_buffer
        console.log(this.buffer)
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
        let projects;

        // Find the projects which are living in the same array as the given id
        for (let type of this.buffer) {
            for (let item of type) {

                // We found the id which should have been randomly accessible as a dict key
                if (item[0] == _id) {

                    document.getElementById(_id).classList.add('hlt')

                    // Get this item's related projects
                    projects = item[2]

                    // Every project this technology is linked to
                    if (!this.anchored)
                        this.projects = projects

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
        console.log(this.linked)

        // Mutex.lock() lol
        this.anchored = true
        this.curSelection = e.target.id;
        let anchored_projects = [...this.projects]
        // Mutex.unlock()
        this.anchored = false
        console.log(`Cur Selection : ${this.curSelection}`)
        console.log(`Cur Projects : `)
        console.log(this.projects)

        // Expand this list of technologies into their individual projects
        

        // Assign each project a list of its technologies
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
