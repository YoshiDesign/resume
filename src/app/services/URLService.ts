import { Injectable } from '@angular/core';
import { PreviewService } from './PreviewService'
import {DomSanitizer} from '@angular/platform-browser';

@Injectable() // Injected into project-view.component.ts
class URLService  {

    /**
     * This class should probably be named something else.
     * It observes the URL and builds the preview windows accordingly
     */

    PreviewService : PreviewService 

    public media_ref : string
    public video : boolean
    private sanitizer


    constructor(PreviewService : PreviewService,
        sanitizer: DomSanitizer ){
        this.PreviewService = PreviewService
        this.media_ref = ""
        this.sanitizer = sanitizer
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
        const nextState = { additionalInformation: 'Anthony\'s Portfolio - preview-id: ' + query}

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

        this.buildNewPreview(query, data)

    }

    /**
     * Construct a preview
     * @param id 
     */
    buildNewPreview(query, data) {

        let previewData;
        let iconHeadingContainer = document.createElement("div") // container for tech icons
        let icons : Array<HTMLElement> = []

        iconHeadingContainer.classList.add('tech-used')

        // Index into the "projects" object, fetching this project's object
        for (let item of data) {
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

            if (icons.length == 0) imgContainer.innerHTML = "<h3 style=\"color:white; margin-right:20px;\">Classified</h3>"
            icons.forEach( el => {
                imgContainer.appendChild(el)
            })

            // Reveal the preview container
            document.getElementById('preview-tech').classList.remove('hide-me')
            document.getElementById('p-window-title').innerText = previewData.title // TODO - I'm only grabbing the first obj. I don't have any projects with multiple projects... but it's there...
            document.getElementById('previewDescription').innerHTML = previewData.projects[0].desc
            document.getElementById('previewLink').innerHTML = previewData.projects[0].link
            console.log("MEDIA")
            console.log( previewData.projects[0].media)

            let extra_media = false
            if (previewData.projects.length > 1) {
                extra_media = true

                // Build the additional comments section
                document.getElementById('adtl').classList.remove('hide-me')
                document.getElementById('adtl-p').innerHTML = previewData.projects[1].alt_title + " - " + previewData.projects[1].desc

            }  
            else {
                document.getElementById('adtl').classList.add('hide-me')
            }


            // Smooth out the first dropdown transition
            setTimeout(() => {
                document.getElementById('tech-window').classList.add('lup')    
            }, 100);

            if (typeof previewData.projects[0].media != "object" && previewData.projects[0].media.toLowerCase().includes("mp4"))
            {
                let iframe = document.createElement("IFRAME")
                iframe.id = "pFrame"
                iframe.setAttribute('src', previewData.projects[0].media)
                iframe.setAttribute('frameborder', "0")
                iframe.setAttribute('allowfullscreen', "")
                iframe.setAttribute('class', "vid")
                document.getElementById('media').appendChild(iframe)
                
            }
            else
            {
                for (let img of previewData.projects[0].media) {
                    console.log(img)
                    let pimage = document.createElement('IMG')
                    pimage.setAttribute('src', img)
                    pimage.setAttribute('class', 'png')
                    pimage.setAttribute('height', '110px')
                    pimage.setAttribute('width', '190px')
                    document.getElementById('media').appendChild(pimage)

                }
                
            }

        }


    }

}

export default URLService;