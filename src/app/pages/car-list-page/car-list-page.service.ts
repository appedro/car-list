import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Car } from '../../shared/models/car';

@Injectable({
  providedIn: 'root',
})
export class CarListPageService {
  carsSignal = signal<Car[]>([]);
  loadingSignal = signal<boolean>(false);
  errorSignal = signal<string | null>(null);

  private apiUrl = 'http://localhost:3000/api/cars/all';

  constructor(private http: HttpClient) { }

  getAllCars() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<Car[]>(this.apiUrl).pipe(
      tap((data) => {
        this.carsSignal.set(data);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Erro ao carregar carros');
        this.loadingSignal.set(false);
        throw error;
      })
    ).subscribe();
  }

  addCar(newCar: Car) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.post<Car>(`${this.apiUrl}/add`, newCar).pipe(
      tap((car) => {
        this.carsSignal.set([...this.carsSignal(), car]);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Erro ao adicionar carro');
        this.loadingSignal.set(false);
        throw error;
      })
    ).subscribe();
  }

  updateCar(updatedCar: Car) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.put<Car>(`${this.apiUrl}/update`, updatedCar).pipe(
      tap((car) => {
        const updatedCars = this.carsSignal().map(c => c.id === car.id ? car : c);
        this.carsSignal.set(updatedCars);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Erro ao atualizar carro');
        this.loadingSignal.set(false);
        throw error;
      })
    ).subscribe();
  }

  deleteCar(carId: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.delete(`${this.apiUrl}/delete/${carId}`).pipe(
      tap(() => {
        const updatedCars = this.carsSignal().filter(car => car.id !== carId);
        this.carsSignal.set(updatedCars);
        this.loadingSignal.set(false);
      }),
      catchError((error) => {
        this.errorSignal.set('Erro ao deletar carro');
        this.loadingSignal.set(false);
        throw error;
      })
    ).subscribe();
  }
}
