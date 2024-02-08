import { Component } from '@angular/core'
import { QueryInputFieldComponent } from './queryinputfield/queryinputfield.component'
import { HeaderTextComponent } from './headertext/headertext.component'
import { CountdownComponent } from './countdown/countdown.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QueryInputFieldComponent, HeaderTextComponent, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
