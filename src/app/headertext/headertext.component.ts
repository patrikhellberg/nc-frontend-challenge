import { Component } from '@angular/core'
import { FullWidthTextComponent } from '../fullwidthtext/fullwidthtext.component'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'header-text',
  standalone: true,
  imports: [FullWidthTextComponent],
  template: `<full-width-text [text]="text" textElement="h1" /> `,
})
export class HeaderTextComponent {
  constructor(public route: ActivatedRoute) {}
  text = ''
  TEXT_FALLBACK = 'Type an event to display here'

  ngOnInit() {
    this.route.queryParamMap.subscribe((p) => {
      this.text = !!p.get('title')
        ? `Time to ${p.get('title')}`
        : this.TEXT_FALLBACK
    })
  }
}
