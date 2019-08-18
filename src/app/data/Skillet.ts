
export default class Skillet {

    public data : Object;

    constructor(){ // "Database"
        this.data =  {
            "Projects" : [
                {
                    "title" : "Personal API",
                    "desc"  : "I use Heroku to host a Python web server. It is a Flask installation that is currently being used to service any means of data transfer I require from 3rd part API's to database stores. An ever expanding asset.",
                    "alt_title" : 0
                },
                {
                    "title" : "OpenCV &amp; Robotics",
                    "desc"  : "I've always wanted to dive head-first into robotics and electrical engineering. Click here to see my robot buddy. It can see you too!",
                    "alt_title" : 0
                },
                {
                    "title" : "Personal Space Invaders",
                    "desc"  : "This one is quite hard to explain. Essentially, I analyze tweet timelines through sentiment analysis and turn them into a game of Space Invaders. See it in action here.",
                    "alt_title" : 0
                },
                {
                    "title" : "Steganography (CS50 Final)",
                    "desc"  : "A web application and learning tool that I built using Python. It is your conventional steganographic image processor. Conceal text, encrypted messages, love letters and the like. The CLI version is available on github, which also offers the\"inspector\" switch.",
                    "alt_title" : "steganography"
                }
            ]
        },
        {
            "Certification" : [
                {
                    "title" : "CompTIA A+",
                    "desc"  : "Certifies general knowledge & practices in hardware, networking and software in the field of Information Technology.",
                    "alt_title" : 0
                },
                {
                    "title" : "CompTIA CySA+",
                    "desc"  : "A much more involved certificate, the CySA+ demonstrates knowledge and practical skills in the fields of Cyber Forensics and Cyber Defense. Through this certification I have learned how to utilize many of the tools available in the Ethical Hacker's toolbelt.",
                    "alt_title" : 0
                },
                {
                    "title" : "Harvard CS50x",
                    "desc"  : "Introduction to Computer Science. Taught by the mighty David Malan, Gordon McKay Professor of the Practice of Computer Science. This course was so amazing that I began taking it a 2nd time. I was a very active tutor on the CS50 reddit long after completion which subsequently prompted the creation of my WordPress site.",
                    "alt_title" : 0
                },
                { 
                    "title" : "Harvard CS50B",
                    "desc"  : "Computer Science for Business Professionals. Also taught by David Malan, this class focused more on the abstractions which computer science offers in your business domain. It covers everything from network architecure to cloud computing and security.",
                    "alt_title" : "steganography"
                }
            ]
        }
    }
}