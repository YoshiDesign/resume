import Skillet from '../repo/Skillet'
import * as Descriptions from '../repo/Descriptions.json'
import { Injectable } from '@angular/core';

@Injectable()
export class PreviewService {

    Descriptions : any = Descriptions;
    private skillet : Skillet

    constructor(
        skillet : Skillet
    ){
        this.Descriptions = Descriptions
        this.skillet = skillet
    }

    /**
     * Apply icons to Table of Contents
     * @param tech - The slug from Skillet.details
     */
    getIcon(tech) : any {

        let imgs = []

        for (let slug of tech) {
            console.log(`Inspecting Slug: ${slug}`)
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
            console.log(imgs)
            return imgs
        }
        else {
            return false
        }

    }

}