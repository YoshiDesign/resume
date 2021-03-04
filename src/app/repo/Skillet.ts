import { Injectable } from '@angular/core';

/**
 * Notes:
 * WP, LNX and NO have their own displays
 * due to a lack of any concise manner for
 * which to explain my experience with w each across projects.
 */

 /**
  * TODO
  * IoT Core / Azure
  * Git
  */

@Injectable()   //Injected into ResumeService.ts
export default class Skillet {

    public details : object
    public reference : object

    constructor () { // "Database"

        /**
         * A unique identity for each of my projects, 1 indexed
         * Each tech/detail has a set of these to denote which
         * project they were involved in creating.
         */
        enum P {
            DEMME = 1,WW,RES,OCV,
            CS50,UTAUST,STEG,
            PSI,GAME,API
        }

        this.reference = {
            'demme' : P.DEMME,
            'ww' : P.WW,
            'res' : P.RES,
            'ocv' : P.OCV,
            'cs50' : P.CS50,
            'utaust' : P.UTAUST,
            'steg' : P.STEG,
            'psi' : P.PSI,
            'api' : P.API
        }

        /** Project details : Primary data structure to feed frontend factories
            "row" : [
                [id, icon-src [project, project]
                [id, icon-src [project, project]
                [id, icon-src [project, project]
            ], ...
            Keep your filenames close, and your extensions closer....
         */
        this.details = {

            /**
             * These details are injected into a buffer in ResumeService.ts
             * This way we can maintain a uniform storage format for any data
             * that might be added in the future. The buffer will handle the
             * differences in how the data is represented to the end-user
             */

            lingua : [
                ['js', "cjs.png",   [P.WW,P.RES,P.CS50,P.DEMME]],
                ['py',  "py.png",   [P.PSI,P.STEG,P.CS50, P.API]],
                ['cpp', "cpp.png",  [P.OCV,P.GAME]],
                ['ts',  "ts.png",   [P.RES,P.WW,P.DEMME]],
                ['php', "php.png",  [P.DEMME]],
                ['bash',"sheb.png", [P.WW, P.DEMME]],
                ['lua', "lua.png",  [P.CS50]],
                ['csharp', "cs.png",[P.OCV, P.GAME]]
            ],

            frameworks : [
                ['nodejs', "nodejs.png",[P.WW]],
                ['react',  "react.png", [P.WW]],
                ['lara',   "lara.png",  [P.DEMME]],
                ['ang',    "ang.png",   [P.DEMME, P.RES]],
                ['flask',  "flask.png", [P.STEG, P.API]],
            ],

            libraries : [
                ["gql",  "gql.png",     [P.WW]],
                ["ossl", "ossl.png",    [P.DEMME]],
                ["ocv",  "ocv.png",     [P.OCV]],
                ["d3",   "d3.png",      [P.WW]],
                ["pgame","pgame.png",   [P.PSI]],
            ],

            other : [
                ["rds",    "rds.png",   [P.API, P.WW]],
                ["mysql",  "mysql.png", [P.CS50, P.DEMME]],
                ["pgsql", "pgsql.png",  [P.API]],
                ["mgo",   "mgo.png",    [P.WW]],
                ["hku",   "hku.png",    [P.PSI,P.API,P.STEG]],
                ["wp",    "wp.png",     [P.DEMME]],
                ["apache", "apache.png", [P.DEMME]]
            ],

            iot : [
                ["vs", "vs.png", [P.OCV, P.UTAUST, P.GAME]],
                ["ardno", "ard.png",    [P.OCV]],
                ["rpi",   "rpi.png",    [P.OCV]],
                ["unity", "unity.png", [P.GAME]],
                ["lnch",  "tva.png",    [P.UTAUST]]
            ],

            sys : [
                ["lnx",   "ln.png",     [P.PSI, P.API, P.DEMME, P.OCV]],
                ["arm", "arm.png", [P.OCV, P.UTAUST]],
                ["cmake", "cmake.png", [P.OCV]],
                ["vim", "vim2.png", [P.OCV, P.UTAUST]],
                ["gnu", "gnu.png", [P.OCV]]

            ]
        }
    }
}