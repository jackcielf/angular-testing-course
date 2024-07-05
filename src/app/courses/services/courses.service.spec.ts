import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { COURSES } from '../../../../server/db-data';

describe(`CoursesService`, () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it(`Should retrieve all courses`, () => {

    coursesService.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy("No courses returned");

      expect(courses.length).toBe(12, "Incorrect number of courses");

      const course = courses.find(course => course.id == 12);

      expect(course.titles.description).toBe("Angular Testing Course");
    });

    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual("GET");

    req.flush({ payload: Object.values(COURSES) }); 
  });
});
