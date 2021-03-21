import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../services/PreviewService'

// Key to access the projects array within Descriptions.json
const PROJECTS = "projects"

@Component({
  selector: 'app-social-view',
  templateUrl: './social-view.component.html',
  styleUrls: ['./social-view.component.css'],
  providers: [PreviewService]
})
export class SocialViewComponent implements OnInit {

    PreviewService : PreviewService
    data : any

    public current_preview : string
    
    constructor(PreviewService : PreviewService) { 
        this.PreviewService = PreviewService
        this.data = this.PreviewService.Descriptions.default
    }

    ngOnInit() {

        this.buildToC()

        document.getElementById('previews').addEventListener('scroll', function(){
            console.log("SCROLLIN HATN")
            document.getElementById('da').style.display = "none";
        })

        // Integrating the browser's "back" button for project previews
        window.onpopstate = (e) => {
            let lastURL = new URL(window.location.href)
            let lastPreview = lastURL.searchParams.get('preview')
            console.log("EVENT")
            console.log(e)
            console.log(lastPreview)

            // Routing
            if (!lastPreview) this.buildToC()
            else this.selectPreview(lastPreview)
        };

    }

    /**
     * Push a new URI onto window.history, allowing us to
     * hook the browser's "back" button into the preview pane
     * @param e 
     */
    updateURLParams = (e) => {

        let p = e.target.getAttribute("data-toc-id")

        // Update the latest preview id
        this.current_preview = p

        // Generate an updated URL
        let url = new URL(document.location.href)
        url.searchParams.set("page", p)

        // History API attributes
        const nextURL = url.href
        const nextTitle = document.title
        const nextState = { additionalInformation: 'Anthony\'s Portfolio - preview-id: ' + p }

        // Create a new entry in the browser's history
        window.history.pushState(nextState, nextTitle, nextURL)

        // Replace the current entry in the browser's history
        window.history.replaceState(nextState, nextTitle, nextURL)

        // Initiate the preview update
        this.selectPreview(p)

    }

    /**
     * Prepare the preview pane for a new preview
     * @param query 
     */
    selectPreview(query) : void {
        
        // Clear the preview window
        document.getElementById('p-content').innerHTML = ""

        // Deactivate any active tabs. There should only be one but this is a limitation
        Array.from(document.getElementsByClassName('active-unit')).forEach( el => {
            el.classList.remove('active-unit')
        })

        // Select the proper preview location dot and activate it
        let activeTab = document.querySelector("[data-unit-id="+ query +"]")
        activeTab.classList.add('active-unit')

        this.buildNewPreview(query)

    }

    /**
     * Construct a new preview in the preview pane
     * @param id 
     */
    buildNewPreview(id) {

        // This preview's object in Descriptions.json
        let previewData;

        console.log(`Searching for ${id}`)
        console.log(this.data[0][PROJECTS])

        // Index into the "projects" object, fetching this project's object
        for (let item of this.data[0][PROJECTS]) {
            if (item.id == id) {
                previewData = item
                break
            }
        }

        console.log("PREVIEW DATA")
        console.log(previewData)

        let head  = document.createElement("h3")    // Heading
        let iconHeadingContainer = document.createElement("div") // container for tech icons

        iconHeadingContainer.classList.add('tech-used')

        // Use `tech` to find the `icons` of its related projects (1 to many, respectively)
        let tech : Array<string> = this.PreviewService.getAllIcons(previewData.id)
        let icons : Array<HTMLElement> = []
        
        for (let filename in tech) {
            let icon = document.createElement('IMG')
            icon.setAttribute('src', "assets/img/" + filename)
            icon.classList.add("toc-img")
            icons.push(icon)
        }

    }

    buildToC() : void {

        // Set state
        this.current_preview = "toc"

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

                    let apply_to_meter = true

                    iconSection.classList.add('icon-section')
 
                    if (j == PROJECTS) {
                        item.addEventListener('click', this.updateURLParams)
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

    setIconSectionListeners(s) {
        s.addEventListener('mouseover', function(e){
            this.style.background = "blue"
            this.parentElement.classList.add("black")
        })
        s.addEventListener('mouseout', function(e){
            this.style.background = "black"
            this.parentElement.classList.remove("black")
        })
    }

}
