import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "./courses.service";

export function courseResolver(route: ActivatedRouteSnapshot): Observable<Course> {
  const coursesService = inject(CoursesService);

  return coursesService.findCourseById(route.params["id"]);
}
