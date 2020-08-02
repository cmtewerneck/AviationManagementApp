/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripulanteService } from './tripulante.service';

describe('Service: Tripulante', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripulanteService]
    });
  });

  it('should ...', inject([TripulanteService], (service: TripulanteService) => {
    expect(service).toBeTruthy();
  }));
});
