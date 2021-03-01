import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../model/course';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {StoreService} from '../common/store.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', {static: true}) saveButton: ElementRef;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;
    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  ngAfterViewInit() {
  }

  save() {
    this.storeService.saveCourse(this.course.id, this.form.value)
      .subscribe(
        () => this.close(),
        err => console.log('Error saving course:', err)
      );
  }

  close() {
    this.dialogRef.close();
  }
}
