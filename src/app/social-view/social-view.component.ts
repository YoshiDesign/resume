import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../services/PreviewService'

@Component({
  selector: 'app-social-view',
  templateUrl: './social-view.component.html',
  styleUrls: ['./social-view.component.css'],
  providers: [PreviewService]
})
export class SocialViewComponent implements OnInit {

    PreviewService : PreviewService
    data : any
    public current_preview : number
    
  constructor(PreviewService : PreviewService) { 
      this.PreviewService = PreviewService
      this.data = this.PreviewService.Descriptions.default
  }

  ngOnInit() {
      var contents : Array<HTMLElement> = []
      var pdf = false
      for (let i in this.data) // Indexes
      {
          for (let j in this.data[i])   // Description Keys
          {
                // Make heading and titleCase the string
                let heading = document.createElement("H4")
                heading.classList.add('toc-heads')
                let titles = j.split("_")
                titles.forEach(word => {
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
                let ref = this.PreviewService.getIcon(k.tech[0])

                item.setAttribute('class', 'toc-item')
                item.setAttribute('data-toc-id', k.id)
                item.innerText = k.title
                
                if (!ref)
                {
                    ; // Don't render an icon
                }
                else {
                    let meter = document.getElementById("soc-meter")
                    let unit = document.createElement('DIV')
                    let icon = document.createElement('IMG')

                    // build the meter
                    unit.classList.add('d-unit')
                    unit.setAttribute('data-list-id', k.id)
                    meter.appendChild(unit)

                    icon.setAttribute('src', "assets/img/" + ref)
                    icon.classList.add("toc-img")
                    item.appendChild(icon)    
                }
                
                headingList.appendChild(item)

            }
            contents.push(headingList)
          }
      }
      console.log(contents)
      contents.forEach(el => {
          let toc = document.getElementById('p-content')
          toc.appendChild(el)
      })

  }

}
