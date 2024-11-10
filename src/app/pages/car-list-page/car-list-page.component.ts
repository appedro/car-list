import { Component } from '@angular/core';
import { Car } from '../../shared/models/car';
import { CarListPageService } from './car-list-page.service';
import { CarCardComponent } from '../../shared';

@Component({
  selector: 'app-car-list-page',
  standalone: true,
  imports: [CarCardComponent],
  providers: [CarListPageService],
  templateUrl: './car-list-page.component.html',
  styleUrl: './car-list-page.component.scss'
})
export class CarListPageComponent {
  cars = this.carListService.carsSignal;
  loading = this.carListService.loadingSignal;
  error: string | null = null;

  constructor(private carListService: CarListPageService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  private loadCars() {
    this.carListService.getAllCars();
  }

}
