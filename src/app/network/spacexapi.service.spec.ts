import { TestBed } from '@angular/core/testing';
import { SpacexapiService } from './spacexapi.service';

describe('SpacexapiService', () => {
  let spacexService: SpacexapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    spacexService = TestBed.inject(SpacexapiService);
  });

  it('should instantiate the service', () => {
    expect(spacexService).toBeTruthy();
  });
});
