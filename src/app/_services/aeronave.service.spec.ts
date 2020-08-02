/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AeronaveService } from './aeronave.service';

describe('Service: Aeronave', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AeronaveService]
    });
  });

  it('should ...', inject([AeronaveService], (service: AeronaveService) => {
    expect(service).toBeTruthy();
  }));
});
