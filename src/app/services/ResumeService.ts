import { Injectable } from '@angular/core';
import Skillet from '../repo/Skillet'

@Injectable() // Injected into project-view.component.ts
export class ResumeService  {
    
    public linguaDetail : object    = []
    public frameworkDetail : object = []
    public libraryDetail : object   = []
    public otherDetail : object     = []
    public iotDetail : object       = []
    public buffer : object = []

    /**
     * An object containing the data that we'll need 
     * in order to populate my (enviable?) proficiencies
     */
    private skillet : Skillet

    constructor (
        skillet : Skillet
    ) {
        this.skillet = skillet
        this.buffer = this.setupProjects()
    }

    /**
     * Build the iterables containing our details.
     * Each iterable describes a row beneath "Proficiencies"
     */
    setupProjects () {

        let buffer = []

        for (let item in this.skillet.details) {
            buffer.push(this.skillet.details[item])
        }

        return buffer

    }
}