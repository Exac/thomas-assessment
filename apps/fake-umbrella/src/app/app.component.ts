import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@thomas-assessment/api-interfaces';

@Component({
  selector: 'thomas-assessment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
