import { Injectable } from '@angular/core';
import { PreviewService } from './PreviewService'
import { wrapEvent } from '../Helpers/Helpers'
import windowResize, { MOBILE_SCREEN_SIZE } from '../Helpers/WindowResize'

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
    public currentDeviceScale

    constructor(PreviewService : PreviewService){
        this.PreviewService = PreviewService
        this.media_ref = ""
        this.data = this.PreviewService.Descriptions.default
        this.previewData = null
    }

    resetURL() :void
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

    /**
     * 
     */
    buildToC() : void {

        console.log("BUILDING")
        this.resetTech();

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
                            wrapEvent(this.updateURLParams, this.data[0][PROJECTS])
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

    /**
     * Push a new URI onto window.history, allowing us to
     * hook the browser's "back" button into the preview pane
     * @param e 
     */
    updateURLParams = (e, data) => {

        let query  = e.target.closest('li').getAttribute("data-toc-id")

        // remove the previous iframe
        document.getElementById('media').innerHTML = ""

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

        // -- TODO -- This next call could be returned by this function instead. We would then add
        // selectPreview() and buildNewPreview() to the social-view-component.
        // However, for readability, I like them within this file, because execution streams linearly.
        // This class always executes from top to bottom

         // Initiate the preview update 
        this.selectPreview(query, data)

    }

    /**
     * Evt listener - the user clicks on a ToC list item
     * Prepare the preview pane for a new preview
     * @param query 
     */
    selectPreview(query, data) : void {

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

        this.buildNewPreview(query, data)

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
        if (icons.length == 0) imgContainer.innerHTML = "<h3 style=\"color:white; margin-right:20px;\">Classified</h3>"

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
    }

    loadTheatre() {
        console.log(this.previewData.projects[0].media)
    }
}

export default FactoryService;