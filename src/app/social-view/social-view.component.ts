import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../services/PreviewService'
import URLService from '../services/URLService';
import { wrapEvent } from '../Helpers/Helpers'

// Key to access the projects array within Descriptions.json
const PROJECTS = "projects"

@Component({
  selector: 'app-social-view',
  templateUrl: './social-view.component.html',
  styleUrls: ['./social-view.component.css'],
  providers: [PreviewService]
})
export class SocialViewComponent implements OnInit {

    // Watches URLs and builds appropriate previews
    URLService : URLService;
    PreviewService : PreviewService
    data : any

    // public current_preview : string
    public current_core_tech : Array <string>
    
    constructor(PreviewService : PreviewService, URLService : URLService) { 
        this.URLService = URLService
        this.PreviewService = PreviewService
        this.data = this.PreviewService.Descriptions.default
    }

    ngOnInit() {

        this.buildToC()

        // Hide the arrow on ToC once it's scrolled
        document.getElementById('previews').addEventListener('scroll', function(){
            document.getElementById('da').style.display = "none";
        })

        // Closes preview windows
        document.getElementById("X").addEventListener('click', e => {

            document.getElementById('preview-tech').classList.add('hide-me')
            Array.from(document.getElementsByClassName('tech-section')).forEach( el => {
                el.classList.remove('hide-me')
            })

            // Reset the heading
            document.getElementById('p-window-title').innerText = "Proficiencies"
            // Reset the URL
            this.URLService.resetURL()

        })

        // Integrating the browser's "back" button for project previews
        window.onpopstate = (e) => {

            let lastURL = new URL(window.location.href)
            let lastPreview = lastURL.searchParams.get('page')

            // Routing
            if (!lastPreview) this.buildToC()
            else this.URLService.selectPreview(lastPreview, this.data[0][PROJECTS])
        };

    }

    ngAfterViewInit() {

        // Check the URL for queries
        let url = new URL(window.location.href)
        let q = url.searchParams.get('page')

        if (q == "toc"){
            this.buildToC()
        }
        else if(q != null) {
            this.URLService.selectPreview(q, this.data[0][PROJECTS])
        }
        
    }

    buildToC() : void {

        // A list of headings for the ToC
        var contents : Array <HTMLElement> = []

        for (let i in this.data) // JSON index
        {
            for (let j in this.data[i])   // Description Keys
            {
                // Make heading and titleCase the string
                let heading = document.createElement("H4")
                heading.classList.add('toc-heads')

                // Make sure each heading title is title-cased
                let titles = j.split("_")
                titles.forEach( word => {
                    heading.innerText += word.charAt(0).toUpperCase() + word.slice(1) + " "
                })

                contents.push(heading)

                // Make each section's list
                let headingList = document.createElement('UL')
                headingList.classList.add('toc-list')
                headingList.setAttribute('id', j+"-list")

                for (let k of this.data[i][j])  // Datas
                {
                    // Create the table of contents
                    let item = document.createElement('LI')
                    // Contains the group of little icons on the ToC, apply evt listeners
                    let iconSection = document.createElement('DIV')
                    this.setIconSectionListeners(iconSection)
                    iconSection.classList.add('icon-section')

                    let apply_to_meter = true

                    if (j == PROJECTS) {
                        item.addEventListener(
                            'click', 
                            wrapEvent(this.URLService.updateURLParams, this.data[0][PROJECTS])
                        )
                    }

                    // Get the tech slug from the JSON DB
                    let refs = this.PreviewService.getIcon(k.tech)

                    item.setAttribute('class', 'toc-item')
                    item.setAttribute('data-toc-id', k.id)
                    item.innerText = k.title

                    if (refs.length == 0)
                    {
                        console.log("No Refss")
                        ; // Don't render an icon
                    }
                    else {

                        let meter = document.getElementById("soc-meter")
                        let unit = document.createElement('DIV')
                        
                        
                        for (let filename of refs) {
                            // Set up new tech icon for ToC
                            let icon = document.createElement('IMG')

                            icon.setAttribute('src', "assets/img/" + filename)
                            icon.classList.add("toc-img")

                            iconSection.appendChild(icon)

                            // Only projects will be previewd in the panel. This makes sure we only generate carousel cues for projects
                            apply_to_meter = j == PROJECTS ? true : false

                            if (apply_to_meter) {
                                // The carousel cue
                                unit.classList.add('d-unit')
                                unit.setAttribute('data-unit-id', k.id)
                                // The collection of cues
                                meter.appendChild(unit)
                            }

                        }
                            
                    }

                    // keeps border away from icon groups that aren't in the project's section
                    if (!apply_to_meter)
                        iconSection.classList.add('icon-style-override')

                    item.appendChild(iconSection)
                    headingList.appendChild(item)

                }

                contents.push(headingList)

            }

            // Show the scroll indicator
            document.getElementById("da").innerHTML = "&#x2193;"

        }

        // Populate the table of contents with each <li>
        contents.forEach(el => {
            let toc = document.getElementById('p-content')
            toc.appendChild(el)
        })
        
    }

    // Add event listeners to ToC's ".icon-section"s
    setIconSectionListeners(s) {



        // Mobile event behavior
        if (window.innerWidth <= 973) {

            s.addEventListener('click', function(e){
                this.style.background = "black"
                this.parentElement.classList.remove("black")
            })

        // Desktop event behavior
        } else {

            //
            s.addEventListener('mouseover', e => {
                e.stopPropagation()
                // Get all tech icons, append to the current section
                let projectId = e.target.closest('LI').getAttribute('data-toc-id')
                let imgContainer = e.target.closest('.icon-section')
                let newImg = document.createElement('IMG')
                let newIcons : Array<string> = this.PreviewService.getAllIcons(projectId)

                newImg.setAttribute('class', 'toc-img tmp_img')

                newIcons.forEach( filename => {
                    var found = 0
                     Array.from(imgContainer.children).forEach( (el : HTMLImageElement) => {
                        if (el.src.includes(filename)) {found = 1}
                    })
                    if (!found){
                        // Append a new image to the list and extend the boundaries
                        let nextImg = <HTMLImageElement> newImg.cloneNode(true)
                        nextImg.setAttribute('src', "assets/img/" + filename)
                        imgContainer.appendChild(nextImg)
                    }
                })

                e.target.classList.add('icon-update')

            })

            //
            s.addEventListener('mouseout', e => {
                Array.from(document.getElementsByClassName('tmp_img')).forEach( el => {
                    el.remove()
                })
                e.target.classList.remove('icon-update')
            })

        }
    }

}
