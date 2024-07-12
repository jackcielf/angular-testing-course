import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from "@angular/core/testing";

describe(`CalculatorService`, () => {
  let calculatorService: CalculatorService;
  let loggerSpyService: any;

  beforeEach(() => {
    loggerSpyService = jasmine.createSpyObj(`LoggerService`, ["log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpyService },
      ],
    });

    calculatorService = TestBed.inject(CalculatorService);
  });

  it(`Should add two numbers`, () => {
    const result = calculatorService.add(2, 2);

    expect(result).toBe(4);
    expect(loggerSpyService.log).toHaveBeenCalledTimes(1); // Determina que essa função 'log' só pode ser chamada uma vez
  });

  it(`Should subtract two numbers`, () => {
    const result = calculatorService.subtract(12, 3);

    expect(result).toBe(9, `Unexpected subtraction result`);
    expect(loggerSpyService.log).toHaveBeenCalledTimes(1);
  });
});
