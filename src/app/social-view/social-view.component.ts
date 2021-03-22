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
    public current_core_tech : Array <string>
    
    constructor(PreviewService : PreviewService) { 
        this.PreviewService = PreviewService
        this.data = this.PreviewService.Descriptions.default
    }

    ngOnInit() {

        this.buildToC()

        document.getElementById('previews').addEventListener('scroll', function(){
            document.getElementById('da').style.display = "none";
        })

        document.getElementById("X").addEventListener('click', e => {
            document.getElementById('preview-tech').classList.add('hide-me')
            Array.from(document.getElementsByClassName('tech-section')).forEach( el => {
                el.classList.remove('hide-me')
            })
            // Reset the heading
            document.getElementById('p-window-title').innerText = "Proficiencies"
        })

        // Integrating the browser's "back" button for project previews
        window.onpopstate = (e) => {

            let lastURL = new URL(window.location.href)
            let lastPreview = lastURL.searchParams.get('page')

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

        let query = e.target.closest('li').getAttribute("data-toc-id")

        // Update the latest preview id
        this.current_preview = query

        // Generate an updated URL
        let url = new URL(document.location.href)
        url.searchParams.set("page", query)

        // History API attributes
        const nextURL = url.href
        const nextTitle = document.title
        const nextState = { additionalInformation: 'Anthony\'s Portfolio - preview-id: ' + query}

        // Create a new entry in the browser's history
        window.history.pushState(nextState, nextTitle, nextURL)

        // Replace the current entry in the browser's history
        window.history.replaceState(nextState, nextTitle, nextURL)

        // Initiate the preview update 
        // -- TODO -- This is just a callback. This function can be a closure.
        // We can generalize this function and extract it into its own class
        // to have a global history class
        this.selectPreview(query)

    }

    /**
     * Evt listener - the user clicks on a ToC list item
     * Prepare the preview pane for a new preview
     * @param query 
     */
    selectPreview(query) : void {
        document.getElementById('tech-window').classList.remove('lup')
        // Clear the preview windows
        if (window.innerWidth <= 973) {

            document.getElementById('p-content').innerHTML = ""

            // Deactivate any active tabs. There should only be one but this is a limitation
            Array.from(document.getElementsByClassName('active-unit')).forEach( el => {
                el.classList.remove('active-unit')
            })

            // Select the proper preview location dot and activate it
            let activeTab = document.querySelector("[data-unit-id="+ query +"]")
            activeTab.classList.add('active-unit')
        } else {
            // remove proficiencies
            Array.from(document.getElementsByClassName('tech-section')).forEach( el =>  {
                el.classList.add('hide-me')
            })

        }

        this.buildNewPreview(query)

    }

    /**
     * Construct a preview
     * @param id 
     */
    buildNewPreview(query) {
        
        let previewData;
        let iconHeadingContainer = document.createElement("div") // container for tech icons
        let icons : Array<HTMLElement> = []

        iconHeadingContainer.classList.add('tech-used')

        // Index into the "projects" object, fetching this project's object
        for (let item of this.data[0][PROJECTS]) {
            if (item.id == query) {
                previewData = item
                break
            }
        }

        // Use `tech` to find the `icons` of its related projects (1 to many, respectively)

        // Make array of <img> for each tech icon
        for (let filename of this.PreviewService.getAllIcons(query)) {
            let icon = document.createElement('IMG')
            icon.setAttribute('src', "assets/img/" + filename)
            icon.setAttribute('alt', filename.split(".")[0])
            icon.setAttribute('class', 'p-tech-img')

            icons.push(icon)
        }

        // previewData - the object from Descriptions.json
        // icons - array of imgs

        if (window.innerWidth <= 973) {


        } else {

            let imgContainer = document.getElementById('previewTechImages')
            imgContainer.innerHTML = ""

            if (icons.length == 0) imgContainer.innerHTML = "<h3 style=\"color:white; margin-right:20px;\">Proprietary</h3>"
            icons.forEach( el => {
                imgContainer.appendChild(el)
            })

            // Reveal the preview container
            document.getElementById('preview-tech').classList.remove('hide-me')
            document.getElementById('p-window-title').innerText = previewData.title // TODO - I'm only grabbing the first obj. I don't have any projects with multiple projects... but it's there...
            document.getElementById('previewDescription').innerHTML = previewData.projects[0].desc
            document.getElementById('previewLink').innerHTML = previewData.projects[0].link

            setTimeout(() => {
                document.getElementById('tech-window').classList.add('lup')    
            }, 100);
            

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
                    iconSection.classList.add('icon-section')

                    let apply_to_meter = true

 
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
