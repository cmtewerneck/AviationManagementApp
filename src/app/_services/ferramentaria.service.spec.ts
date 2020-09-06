/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FerramentariaService } from './ferramentaria.service';

describe('Service: Ferramentaria', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FerramentariaService]
    });
  });

  it('should ...', inject([FerramentariaService], (service: FerramentariaService) => {
    expect(service).toBeTruthy();
  }));
});
