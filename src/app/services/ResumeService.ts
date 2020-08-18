import { Injectable } from '@angular/core';
import Skillet from '../data/Skillet'

@Injectable()
export class ResumeService  {
    
    public linguaDetail : object    = []
    public frameworkDetail : object = []
    public libraryDetail : object   = []
    public otherDetail : object    = []
    public iotDetail : object       = []

    /**
     * An object containing the data that we'll need 
     * in order to populate my (enviable?) proficiencies
     */
    private skillet : Skillet

    constructor (
        skillet : Skillet
    ) {
        this.skillet = skillet
        this.setupProjects()
    }

    /**
     * Build the iterable containing the details 
     * for each row under project proficiencies.
     */
    setupProjects () {

        for (let item in this.skillet.details) {

        }



        // 'js'][1] = [this.P.steg, this.P.ww,  this.P.dform, this.P.resume, this.P.cs50, this.P.dtbs
        this.linguaDetail = [
            []
        ]
        this.frameworkDetail = [
            []
        ]
        this.libraryDetail = [
            []
        ]
        this.otherDetail = [
            []
        ]
        this.iotDetail = [
            []
        ]
    }

};