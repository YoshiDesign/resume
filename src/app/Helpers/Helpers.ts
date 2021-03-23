import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

// Closure to bind args to evt listeners
export function wrapEvent(func, ...args) {
    return function(e) {
        func(e, ...args)
    }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

export abstract class PreviewData {
    
    id : string
    title: string
    tech: string
    alt_title: string
    desc : string
    link: string
    media: string
    caption: string
    
    projects: object

    get getProjects(){
        return this.projects
    }

}