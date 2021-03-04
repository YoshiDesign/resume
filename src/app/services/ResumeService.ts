import { Injectable } from '@angular/core';
import Skillet from '../repo/Skillet'

@Injectable() // Injected into project-view.component.ts
export class ResumeService  {
    
    public skillet_buffer : object = []

    /**
     * An object containing the data that we'll need 
     * in order to populate my (enviable?) proficiencies
     */
    private skillet : Skillet

    constructor (
        skillet : Skillet
    ) {
        this.skillet = skillet
        this.skillet_buffer = this.setupProjects()
    }

    /**
     * Build the iterables containing our details.
     * 
     * Skillet Buffer:
     * Each iterable describes a row beneath "Proficiencies"
     * 
     * Project Buffer:
     * Projects and their associated technologies. Also maps each to the Descriptions.json object
     */
    setupProjects () {

        let skillet_buffer = []

        for (let item in this.skillet.details) {
            skillet_buffer.push(this.skillet.details[item])
        }


        


        return skillet_buffer

    }
}