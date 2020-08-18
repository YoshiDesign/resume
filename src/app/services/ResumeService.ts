import { Injectable } from '@angular/core';

@Injectable()
export class ResumeService {
    
    proDetail : object

    constructor () {
        this.proDetail = {}
    }
    
    setupProjects () {

        const P = {
            dtb: 1,
            ww: 2,
            resume: 3,
            opencv: 4,
            robo: 5,
            cs50 : 6,
            utaust : 7,
            steg : 8,
            psi : 9,
            dform : 10,
            wsg : 11,
            gameng : 12,
            p5js : 13,
            errata : 14
        }

        this.proDetail = {

            // Lingua
            'js' : [P.steg, P.ww,  P.dform, P.resume, P.cs50, P.dtb],
            'py' : [],
            'cpp' : [],
            'ts' : [],
            'php' : [],
            'bash' : [],
            'lua' : [],
            'csharp' : [],

            // Frameworks
            'node' : [],
            'react' : [],
            'lara' : [],
            'anglr' : [],
            'flask' : [],

            //Libs
            'gql' : [],
            'ossl' : [],
            'ocv' : [],
            'd3' : [],
            'pgame' : [],
            
            // Sys
            'rds' : [],
            'mysql' : [],
            'mgo' : [],
            'linx' : [],

            // Electro
            'ardno' : [],
            'rpi' : [],
            'lnch' : [],


        }
    }

};