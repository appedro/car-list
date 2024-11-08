import { Component } from '@angular/core';
import { Car } from '../../shared/models/car';
import { CarListPageService } from './car-list-page.service';

@Component({
  selector: 'app-car-list-page',
  standalone: true,
  imports: [],
  providers: [CarListPageService],
  templateUrl: './car-list-page.component.html',
  styleUrl: './car-list-page.component.scss'
})
export class CarListPageComponent {
  cars: Car[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private carListService: CarListPageService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.loading = true;
    this.error = null;
    this.carListService.getAllCars(); // Chama o método para obter os carros

    // Monitora o Signal diretamente para obter os dados
    this.updateCars();
  }

  private updateCars() {
    this.cars = this.carListService.carsSignal(); // Obtém os dados do Signal diretamente
    this.loading = this.carListService.loadingSignal(); // Obtém o estado de carregamento
    this.error = this.carListService.errorSignal(); // Obtém o erro, se houver
  }
}
