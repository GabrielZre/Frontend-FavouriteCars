import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-favourite-cars',
  templateUrl: './favourite-cars.component.html',
  styleUrls: ['./favourite-cars.component.css']
})
export class FavouriteCarsComponent implements OnInit  {
  public cars: Car[] = [];
  public editCar!: Car;
  public deleteCar!: Car;

  public defaultCar: Car = {
    id: 0,
    mark: 'Default Mark',
    model: 'Default Model',
    fuel: 'Default Fuel',
    engine: 'Default Engine',
    horsePower: '200',
    imageUrl: 'https:"XXX',
    carCode: '12'
  };

  constructor(
    private carService: CarService,
    public userService: UserService
  ){}

  ngOnInit() {
    this.getCars();
  }

  public getCars(): void {
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        console.log(this.cars);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onAddCar(addForm: NgForm): void {
        const addCarForm = document.getElementById('add-car-form');
        if (addCarForm) {
          addCarForm.click();
         }
        this.carService.addCar(addForm.value).subscribe(
        (response: Car) => {
          console.log(response);
          this.getCars();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }

    public onUpdateCar(car: Car): void {
      this.carService.updateCar(car).subscribe(
        (response: Car) => {
          console.log(response);
          this.getCars();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onDeleteCar(carId: number): void {
      this.carService.deleteCar(carId).subscribe(
        (response: void) => {
          console.log(response);
          this.getCars();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public searchCars(key: string): void {
      console.log(key);
      const results: Car[] = [];
      for (const car of this.cars) {
        if (car.mark.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.model.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.fuel.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.engine.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(car);
        }
      }
      this.cars = results;
      if (results.length === 0 || !key) {
        this.getCars();
      }
    }


  public onOpenModal(car: Car, mode: string): void {
    const container = document.getElementById('main-container');

    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');

      if (mode === 'add') {
        button.setAttribute('data-target', '#addCarModal');
      }
      if (mode === 'edit') {
        this.editCar = car;
        button.setAttribute('data-target', '#updateCarModal');
      }
      if (mode === 'delete') {
        this.deleteCar = car;
        button.setAttribute('data-target', '#deleteCarModal');
      }

      container.appendChild(button);
      button.click();
    }
  }
}
