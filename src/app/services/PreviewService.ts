import Skillet from '../repo/Skillet'
import * as Descriptions from '../repo/Descriptions.json'
import { Injectable } from '@angular/core';

@Injectable()
export class PreviewService {

    // Used by this class's client component
    Descriptions : any = Descriptions;

    private skillet : Skillet

    constructor(
        skillet : Skillet
    ){
        this.Descriptions = Descriptions
        this.skillet = skillet
    }


    /**
     * Get all of the tech icons from a Project - exhaustive
     * @param project 
     */
    getAllIcons(project) : any {

        // Get the project key
        let P = this.skillet.reference[project]
        let imgs = []

        console.log(`P = ${P}`)

        // Loop through all Skillet details
        for (let item in this.skillet.details) {

            if (item == "omit")
                continue

            for (let arr of this.skillet.details[item]) {
                console.log("ARR")
                console.log(arr)
                
                    // Gather the PNG filename for the tech we found in this project
                    if (arr[2].includes(P)){
                        console.log("Found: " + arr[0])
                        imgs.push(arr[1])
                    }
                
            }
        }

        return imgs

    }

    /**
     * Get all of the tech icons from a Preview - not exhaustive
     * This includes the omitted key for pdf's
     * @param tech - The slug from Skillet.details
     */
    getIcon(tech) : any {

        // The image filenames to send to client
        let imgs = []

        // Locate the slug from the skillet details
        for (let slug of tech) {

            for (let item in this.skillet.details) {

                for (let row of this.skillet.details[item]) {
                    // Get the PNG filename
                    if (row[0] == slug){
                        imgs.push(row[1])
                    }
                }
            }
        }
        
        if (imgs.length > 0) {
            return imgs
        }
        else {
            return false
        }

    }

}