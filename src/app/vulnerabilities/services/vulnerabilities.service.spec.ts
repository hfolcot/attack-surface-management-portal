import { TestBed } from '@angular/core/testing';

import { VulnerabilitiesService } from './vulnerabilities.service';
import { AppModule } from '../../app.module';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('VulnerabilitiesService', () => {
  let service: VulnerabilitiesService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
     ]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VulnerabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
