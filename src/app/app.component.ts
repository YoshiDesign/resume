import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Anthony Lyristis';

  public switchPos: number = 0;
  public mode: string = '';
  public Descriptions: Array<Array<Object>>;
  public Projects: any;
  public Achievements: any;

  constructor() {
    this.Descriptions = require('./data/Descriptions.json');
    this.Projects = this.Descriptions[0];
    this.Achievements = this.Descriptions[1];
    window.addEventListener('scroll', function () {
      if (this.window.scrollY > 137) {
        if (
          !this.document
            .getElementById('sticky-header')!
            .classList.contains('fix')
        ) {
          document.getElementById('sticky-header')!.classList.add('fix');
        }
      }
      if (this.window.scrollY < 137) {
        if (
          this.document
            .getElementById('sticky-header')!
            .classList.contains('fix')
        ) {
          document.getElementById('sticky-header')!.classList.remove('fix');
        }
      }
    });
  }

  ngOnInit() {
    this.mode = '';
    this.switchPos = 0;
  }

  ngAfterViewInit() {}

  // [!] Frequently executed - Use cautiously [!]
  ngAfterContentChecked() {}

  // Arm the exploding header switch
  switchLed(): void {
    if (this.switchPos == 2) this.switchPos = 0;
    else this.switchPos += 1;

    let nodes = Array.from(document.querySelectorAll('[data-anim]'));
    let modes = Array.from(document.querySelectorAll('[data-mode]'));
    let shows = Array.from(document.querySelectorAll('[data-show]'));
    let explodes = Array.from(document.getElementsByClassName('explode'));

    // Determine the interactive switch's effect
    switch (this.switchPos) {
      case 0:
        break;

      case 1:
        // Blow up the circuit
        document.getElementById('snode')!.style.left = '32px';
        modes.forEach((el) => {
          if (!el.classList.contains('reds')) el.classList.add('reds');
        });

        // Blow up the header
        explodes.forEach((el) => {
          // Randomly assign 1 of any 4 randomly determined directions each animated class
          let mod = Math.random() * 100;
          if (mod > 50) {
            if (mod < 77) {
              el.classList.add('explode-1');
              el.classList.add('end');
            } else {
              el.classList.add('explode-2');
              el.classList.add('end');
            }
          } else {
            if (mod < 27) {
              el.classList.add('explode-3');
              el.classList.add('end');
            } else {
              el.classList.add('explode-4');
              el.classList.add('end');
            }
          }

          // Clean up the header
          setTimeout(function () {
            el.classList.add('hide-me');

            document.getElementById('togg')!.style.display = 'none';
            document.getElementById('nb')!.style.display = 'none';
            document.getElementById('im')!.style.display = 'none';
            // document.getElementById('error').classList.remove('hide-me')
            document.getElementById('nb')!.classList.remove('auto-mg');
            document.getElementById('nb')!.classList.add('sm-mg');
          }, 600);
        });
        break;
    }
  }
}
