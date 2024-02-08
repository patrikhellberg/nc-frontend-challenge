import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QueryInputFieldComponent } from './queryinputfield/queryinputfield.component';
import { FullwidthtextComponent } from './fullwidthtext/fullwidthtext.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QueryInputFieldComponent, FullwidthtextComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
