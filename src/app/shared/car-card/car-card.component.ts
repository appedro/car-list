import { Component, Input } from '@angular/core';
import { Car } from '../models/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input() public car!: Car;

  public getLastLicensePlate(licensePlate: string): string {
    return licensePlate[licensePlate.length - 1];
  }

  public getBrandLogo (brand: string): string {
    return `assets/images/brand/${brand.toLocaleLowerCase()}.png`
  }
}
