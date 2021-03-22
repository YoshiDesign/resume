import { Injectable } from '@angular/core';
import { PreviewService } from './PreviewService'

@Injectable() // Injected into project-view.component.ts
class URLService  {

    /**
     * This class should probably be named something else.
     * It observes the URL and builds the preview windows accordingly
     */

    PreviewService : PreviewService

    constructor(PreviewService : PreviewService){
        this.PreviewService = PreviewService
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

        // // Update the latest preview id
        // this.current_preview = query

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
        // I like them in this file for now though because execution streams linearly.
        // This class executes top to bottom, simple enough for now!

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

}

export default URLService;