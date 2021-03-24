import { Injectable } from '@angular/core';
import { PreviewService } from './PreviewService'
import { wrapEvent } from '../Helpers/Helpers'
import { MOBILE, DESKTOP, MOBILE_SCREEN_SIZE } from '../Helpers/WindowResize'

// Key to access the projects array within Descriptions.json
const PROJECTS = "projects"

@Injectable() // Injected into project-view.component.ts
class FactoryService  {

    /**
     * This class observes the URL and builds the preview windows accordingly
     */

    PreviewService : PreviewService 

    public media_ref : string
    public video : boolean

    private previewData
    private data
    private curProject
    public currentDeviceScale

    constructor(PreviewService : PreviewService){
        this.PreviewService = PreviewService
        this.media_ref = ""
        this.data = this.PreviewService.Descriptions.default
        this.curProject = this.data[0][PROJECTS]
        this.previewData = null
        this.currentDeviceScale = window.innerWidth <= MOBILE_SCREEN_SIZE ? MOBILE : DESKTOP
    }

    resetURL() : void
    {
        let url = new URL(window.location.href)
        url.searchParams.delete('page')
        window.history.pushState(
            {additionalInformation: 'Anthony\'s Portfolio'}, 
            "Anthony T. Lyristis",
            url.href
        )
    }

    resetTech() {
        document.getElementById('preview-tech').classList.add('hide-me')
        document.getElementById('badges').classList.remove('hide-me')
        Array.from(document.getElementsByClassName('tech-section')).forEach( el =>  {
            el.classList.remove('hide-me')
        })
    }

    resetToC() {
        document.getElementById('p-content').innerHTML = ""
        this.buildToC()
    }

    resetAll() {
        this.resetToC()
        this.resetTech()
    }

    /**
     * 
     */
    buildToC(tSet=false) : void {

        this.resetTech();

        // A list of headings for the ToC
        var contents : Array <HTMLElement> = []

        // The carousel cues
        let meter = document.getElementById("soc-meter")
        let unit = document.createElement('DIV')

        meter.innerHTML = ""

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
                            wrapEvent(this.updateURLParams)
                        )
                    }

                    // Get the tech slug from the JSON DB
                    let refs = this.PreviewService.getIcon(k.tech)

                    item.setAttribute('class', 'toc-item')
                    item.setAttribute('data-toc-id', k.id)
                    item.innerText = k.title

                    if (refs.length == 0)
                    {
                        console.log("No Refs")
                        ; // Don't render an icon
                    }
                    else {
                        
                        for (let filename of refs) {

                            // Set up new tech icon for ToC
                            let icon = document.createElement('IMG')

                            icon.setAttribute('src', "assets/img/" + filename)
                            icon.classList.add("toc-img")

                            iconSection.appendChild(icon)

                        }
                            
                    }
                    // Only projects will be previewed in the panel. This makes sure we only generate carousel cues for projects

                    // DEBUG - This loop was running numerous times
                    if (j == PROJECTS) {
                        let n_unit = <HTMLElement> unit.cloneNode(true)
                        // The carousel cue
                        n_unit.classList.add('d-unit')
                        n_unit.setAttribute('data-unit-id', k.id)
                        // The collection of cues
                        meter.appendChild(n_unit)
                    }

                    // keeps border away from icon groups that aren't in the project's section
                    if (j != PROJECTS)
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

    /**
     * Expanding list item icons
     * @param s 
     */
    setIconSectionListeners(s) {

        // Mobile event behavior
        if (window.innerWidth <= MOBILE_SCREEN_SIZE) {

            s.addEventListener('click', function(e){
                this.style.background = "black"
                this.parentElement.classList.remove("black")
            })

        // Desktop event behavior
        } else {

            // Mouse over the icon highlights in the ToC to reveal the full stack at a glance
            s.addEventListener('mouseover', e => {
                e.stopPropagation()

                // Get all tech icons, append to the current section
                let projectId = e.target.closest('LI').getAttribute('data-toc-id')
                let imgContainer = e.target.closest('.icon-section')
                let newImg = document.createElement('IMG')
                let newIcons : Array<string> = this.PreviewService.getAllIcons(projectId)

                newImg.setAttribute('class', 'toc-img tmp_img')

                // While fetching new icons, avoid fetching one's already presented as a highlight. Makes the extension look smoother
                newIcons.forEach( filename => {
                    var found = 0
                     Array.from(imgContainer.children).forEach( (el : HTMLImageElement) => {
                        // We do not need this filename, it's already present
                        if (el.src.includes(filename)) {found = 1}
                    })
                    if (!found){
                        // Append a new image to the list and extend the container
                        let nextImg = <HTMLImageElement> newImg.cloneNode(true)
                        nextImg.setAttribute('src', "assets/img/" + filename)
                        imgContainer.appendChild(nextImg)
                    }
                })

                // Alters the min/max widths and keeps things orderly
                e.target.classList.add('icon-update')

            })

            // Collapse the list
            s.addEventListener('mouseout', e => {
                Array.from(document.getElementsByClassName('tmp_img')).forEach( el => {
                    el.remove()
                })
                e.target.classList.remove('icon-update')
            })

        }
    }

    /**
     * Push a new URI onto window.history, allowing us to
     * hook the browser's "back" button into the preview pane.
     * Should only ever be accessed as an event listener's callback
     * otherwise history would be forever ruined
     * @param e 
     */
    updateURLParams = (e) => {

        let query = e.target.closest('li').getAttribute("data-toc-id")

        // Generate an updated URL
        let url = new URL(document.location.href)
        url.searchParams.set("page", query)

        // History API attributes
        const nextURL = url.href
        const nextTitle = document.title
        const nextState = { additionalInformation: 'Anthony\'s Portfolio - preview-id: ' + query }

        // Create a new entry in the browser's history
        window.history.pushState(nextState, nextTitle, nextURL)

        // Replace the current entry in the browser's history
        window.history.replaceState(nextState, nextTitle, nextURL)

         // Since the URL has changed, initiate a project preview update 
        this.selectPreview(query)

    }

    /**
     * Evt listener - the user clicks on a ToC list item
     * Prepare the preview pane for a new preview
     * @param query 
     */
    selectPreview(query) : void {

        // Special case - Window resize crosses the mobile/desktop threshold without a query parameter in the URL
        if (query == "RESET"){
           this.resetAll()
           return
        }

        // Organize the windows
        document.getElementById('media').innerHTML = ""
        document.getElementById('tech-window').classList.remove('lup')

        if (window.innerWidth > MOBILE_SCREEN_SIZE)
            document.getElementById('badges').classList.add('hide-me')

        // Breakdown of the preview window for rebuild
        if (window.innerWidth <= MOBILE_SCREEN_SIZE) {

            /**
             * Properly display the mobile carousel elements based upon
             * the current selection
             */

            document.getElementById('p-content').innerHTML = ""

            // Deactivate any active tabs. There should only be one but this is a limitation
            Array.from(document.getElementsByClassName('active-unit')).forEach( el => {
                el.classList.remove('active-unit')
            })

            // Select the proper preview location dot and activate it
            let activeTab = document.querySelector("[data-unit-id="+ query +"]")
            activeTab.classList.add('active-unit')

        } else {
            // Remove proficiency rows
            Array.from(document.getElementsByClassName('tech-section')).forEach( el =>  {
                el.classList.add('hide-me')
            })

        }

        this.buildNewPreview(query, this.curProject)

    }

    /**
     * Construct a preview
     * @param id 
     */
    buildNewPreview(query, data) {

        let iconHeadingContainer = document.createElement("div") // container for tech icons
        let icons : Array<HTMLElement> = []

        iconHeadingContainer.classList.add('tech-used')

        // Index into the "projects" object, fetching this project's object
        for (let item of data) {
            if (item.id == query) {
                this.previewData = item
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

        // Rebuild of the preview window        
        let imgContainer = document.getElementById('previewTechImages')
        imgContainer = document.getElementById('previewTechImages')
        imgContainer.innerHTML = ""

        // If any reason to hide the stack, display "Classified" instead
        if (icons.length == 0) imgContainer.innerHTML = "<h3 style=\"color:white; margin-top:4px; margin-right:20px;\">Classified</h3>"

        icons.forEach( el => {
            imgContainer.appendChild(el)
        })
        
        this.showPreviewContainer()

    }

    /**
     * 
     * @param previewData 
     */
    showPreviewContainer() {

        // Reveal the preview container
        if (window.innerWidth > MOBILE_SCREEN_SIZE) document.getElementById('preview-tech').classList.remove('hide-me')

        document.getElementById('previewDescription').innerHTML = this.previewData.projects[0].desc
        document.getElementById('previewLink').innerHTML = this.previewData.projects[0].link

        // Build the additional comments section
        if (this.previewData.projects.length > 1) {

            document.getElementById('adtl').classList.remove('hide-me')
            document.getElementById('adtl-p').innerHTML = this.previewData.projects[1].alt_title + " - " + this.previewData.projects[1].desc

        } 

        // or dont
        else {
            document.getElementById('adtl').classList.add('hide-me')
        }

        // Smooth out the first dropdown transition
        setTimeout(() => {
            document.getElementById('tech-window').classList.add('lup')    
        }, 100);

        this.assemblePreviewAssets()

    }

    /**
     * 
     * @param previewData 
     */
    assemblePreviewAssets() {

        // Videos
        if (typeof this.previewData.projects[0].media != "object" && this.previewData.projects[0].media.toLowerCase().includes("mp4"))
        {
            let frame = document.createElement("VIDEO")
            let src = document.createElement("SOURCE")
            
            src.setAttribute('src', this.previewData.projects[0].media)
            src.setAttribute('type', "video/mp4")
            
            frame.id = "pFrame"
            frame.setAttribute('controls', "")
            frame.setAttribute('class', "vid")
            frame.setAttribute('width', "320")
            frame.setAttribute('height', "320")
            frame.appendChild(src)
            document.getElementById('media').appendChild(frame)
            
        }
        // Images & whatnot
        else
        {
            // Add image thumbnails to the preview window
            for (let img of this.previewData.projects[0].media) {
                let pimage = document.createElement('IMG')
                pimage.setAttribute('src', img)
                pimage.setAttribute('class', 'png')
                pimage.setAttribute('height', '110px')
                pimage.setAttribute('width', '190px')
                document.getElementById('media').appendChild(pimage)
            }
        }
        // Reveal the theatre when any image is selected
        document.getElementById('media').addEventListener('click', e => {
            e.stopPropagation()

            document.getElementById('theatre').classList.add('md-1') // Full width
            document.getElementById('X2').classList.remove('hide-me')
            document.getElementById('tl-arrow').classList.remove('hide-me')
            document.getElementById('tl-arrow').classList.add('ovr-show')
            document.getElementById('tr-arrow').classList.remove('hide-me')
            document.getElementById('tr-arrow').classList.add('ovr-show')

        })

        // Build the carousel ahead of time
        this.loadTheatre()

        if (window.innerWidth <= MOBILE_SCREEN_SIZE) {
            let mobilePreview = <HTMLElement> document.getElementById("preview-tech").cloneNode(true)
            mobilePreview.classList.remove('hide-me')
            mobilePreview.id = "mobile-preview"
            document.getElementById('p-content').appendChild(mobilePreview)
            document.getElementById('X').innerText = this.previewData.title
        }

        if (this.currentDeviceScale == MOBILE) {
            //
        }
        if (this.currentDeviceScale == DESKTOP) {
            //
        }
        
    }

    

    loadTheatre() {
        console.log(this.previewData.projects[0].media)
    }
}

export default FactoryService;