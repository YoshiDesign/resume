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
    getIcon(tech){
        for (let item in this.skillet.details) {
            for (let row of this.skillet.details[item]) {
                // Get the PNG filename
                if (row[0] == tech){
                    return row[1]
                }
            }
        }

        return false

    }

}