import { Component, Input } from '@angular/core';
import { Car } from '../models/car';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input() public car!: Car;

  public getBrandLogo (brand: string): string {
    return `assets/images/brand/${brand.toLocaleLowerCase()}.png`
  }
}
