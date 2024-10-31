import { TestBed } from '@angular/core/testing';

import { ArticuloCategoriaService } from './articulo-categoria.service';

describe('ArticuloCategoriaService', () => {
  let service: ArticuloCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
