import { Component } from '@angular/core';

@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.css'] // Corrected from styleUrl to styleUrls
})
export class HerosectionComponent {
  showHero(heroId: string) {
    const hero1 = document.getElementById('hero1');
    const hero2 = document.getElementById('hero2');

    if (heroId === 'hero1') {
      hero1!.style.display = 'block';
      hero2!.style.display = 'none';
    } else {
      hero1!.style.display = 'none';
      hero2!.style.display = 'block';
    }
  }

}