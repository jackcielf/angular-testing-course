import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';
import { HttpErrorResponse } from '@angular/common/http';

describe(`CoursesService`, () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it(`Should retrieve all courses`, () => {

    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy("No courses returned"); // Inspeciona se há cursos, caso não haja mostra o que está no 'toBeTrothy'
      expect(courses.length).toBe(12, "Incorrect number of courses");

      const course = courses.find(course => course.id == 12);

      expect(course.titles.description).toBe("Angular Testing Course");
    });

    const req = httpTestingController.expectOne('/api/courses'); // Faz um requisição para o api somente uma vez, atráves do 'expectOne'
    expect(req.request.method).toEqual("GET"); // Determina o método da requisição

    req.flush({ payload: Object.values(COURSES) }); // Pega a resposta da requisição 
  });

  it(`Should find a course by ID`, () => {

    coursesService.findCourseById(12).subscribe(course => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');

    req.flush(COURSES[12]);
  });

  it(`Should save the course data`, () => {
    const changes: Partial<Course> = {
      titles: {
        description: "Novo nome de teste",
      }
    }

    coursesService.saveCourse(12, changes).subscribe(course => {
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('PUT');

    expect(req.request.body.titles.description).toEqual(changes.titles.description);
    req.flush({
      ...COURSES[12],
      ...changes[12]
    });
  });

  it(`Should give an error if save course fails`, () => {
    const changes: Partial<Course> = {
      titles: {
        description: "Novo nome de teste",
      }
    }

    coursesService.saveCourse(12, changes).subscribe({
      next: () => {
        fail("The save course operation should have failed")
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne('/api/courses/12');
  
    expect(req.request.method).toEqual('PUT');
  
    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se a requisição está realmente sendo feita somente uma vez
  });
});
