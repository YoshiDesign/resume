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

    public details: {}

    constructor () { // "Database"

        /**
         * A unique identity for each of my projects, 1 indexed
         * Each tech/detail has a set of these to denote which
         * project they were involved in creating.
         */
        enum P {
            DTB = 1,WW,RES,OCV,ROBO,
            CS50,CS50AI,CS50G,UTAUST,STEG,
            PSI,DFORM,WSG,GAME,P5,ERRA,API,LNX,WP,NO
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
                ['js', "cjs.png",   [P.DTB,P.WW,P.RES,P.CS50,P.DFORM,P.P5,P.ERRA]],
                ['py',  "py.png",   [P.PSI,P.STEG,P.CS50,P.CS50AI,P.WW]],
                ['cpp', "cpp.png",  [P.ROBO,P.OCV,P.GAME]],
                ['ts',  "ts.png",   [P.RES,P.WW,P.DFORM,P.WSG,P.ERRA]],
                ['php', "php.png",  [P.DTB,P.ERRA]],
                ['bash',"sheb.png", [P.WW,P.DTB,P.ERRA]],
                ['lua', "lua.png",  [P.CS50G]],
                ['csharp', "cs.png",[P.ROBO, P.OCV]]
            ],

            frameworks : [
                ['nodejs', "nodejs.png",[P.WW]],
                ['react',  "react.png", [P.WW]],
                ['lara',   "lara.png",  [P.DTB]],
                ['ang',    "ang.png",   [P.DFORM, P.ERRA, P.RES, P.WSG]],
                ['flask',  "flask.png", [P.STEG, P.API]]
            ],

            libraries : [
                ["gql",  "gql.png",     [P.WW]],
                ["ossl", "ossl.png",    [P.NO]],
                ["ocv",  "ocv.png",     [P.ROBO, P.OCV]],
                ["d3",   "d3.png",      [P.DTB, P.WW]],
                ["pgame","pgame.png",   [P.PSI]],
            ],

            other : [
                ["rds",    "rds.png",   [P.API]],
                ["mysql",  "mysql.png", [P.DTB, P.CS50, P.ERRA]],
                ["pgsql", "pgsql.png",  [P.API]],
                ["mgo",   "mgo.png",    [P.WW, P.API]],
                ["lnx",   "ln.png",     [P.LNX]],
                ["hku",   "hku.png",    [P.PSI,P.API,P.STEG]],
                ["wp",    "wp.png",     [P.WP]]
            ],

            iot : [
                ["ardno", "ard.png",    [P.ROBO, P.OCV]],
                ["rpi",   "rpi.png",    [P.ROBO]],
                ["lnch",  "tva.png",    [P.UTAUST]]
            ]
        }
    }
}