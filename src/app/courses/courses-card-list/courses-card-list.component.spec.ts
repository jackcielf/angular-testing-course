import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { CoursesModule } from "../courses.module";
import { COURSES } from "../../../../server/db-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { sortCoursesBySeqNo } from "../home/sort-course-by-seq";
import { Course } from "../model/course";
import { setupCourses } from "../common/setup-test-data";

describe("CoursesCardListComponent", () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CoursesModule ],
      declarations: [ CoursesCardListComponent ],
    }).compileComponents();
  });

  it("should create the component", () => {
    const fixture = TestBed.createComponent(CoursesCardListComponent);
    const component = fixture.componentInstance; // Para interações simples com métodos e propriedades do componente

    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    const fixture = TestBed.createComponent(CoursesCardListComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.debugElement;

    component.courses = setupCourses();
    fixture.detectChanges(); // Detecta mudaças no DOM

    const cards = compiled.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should display the first course", () => {
    pending();
  });
});
