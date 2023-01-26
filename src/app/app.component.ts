import {
  Component,
  VERSION,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Annotorious } from '@recogito/annotorious';

import '@recogito/annotorious/dist/annotorious.min.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('annotate', { static: false }) public annotate: ElementRef;

  imageAnnotate: any;
  annotations: any = [];

  ngAfterViewInit() {
    this.imageAnnotate = new Annotorious({
      image: this.annotate.nativeElement,
      /*  widgets: ['COMMENT'], */
    });

    this.imageAnnotate.on('createAnnotation', (annotation, overrideId) => {
      console.log(annotation);
      this.annotations.push(annotation);
    });
  }

  save() {
    //this.annotations = this.imageAnnotate.getAnnotations();
  }

  del(id) {
    this.imageAnnotate.removeAnnotation(id);
    this.annotations = this.imageAnnotate.getAnnotations();
  }

  clear() {
    this.imageAnnotate.clearAnnotations();
  }

  annotateAgain() {
    this.imageAnnotate.setAnnotations(this.annotations);
    this.imageAnnotate.readOnly = true;
  }
}
