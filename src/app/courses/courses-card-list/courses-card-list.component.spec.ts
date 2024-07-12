import { TestBed } from "@angular/core/testing";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { CoursesModule } from "../courses.module";
import { By } from "@angular/platform-browser";
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
    const compiled = fixture.debugElement; // Para acessar o DOM e depurar

    component.courses = setupCourses();
    fixture.detectChanges(); // Detecta mudanças no DOM

    const cards = compiled.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should display the first course", () => {
    const fixture = TestBed.createComponent(CoursesCardListComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.debugElement;

    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0]; 

    // Selecionando um card especifico, seu titulo e imagem
    const card = compiled.query(By.css(".course-card"));
    const title = card.query(By.css("mat-card-title"));
    const image = card.query(By.css("img"));

    expect(card).toBeTruthy("Could not find course card");

    // Verificando se o titulo e imagem correspondem
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
