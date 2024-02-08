import { Component } from '@angular/core'
import { FullwidthtextComponent } from '../fullwidthtext/fullwidthtext.component'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'countdown',
  standalone: true,
  imports: [FullwidthtextComponent],
  template: ` <full-width-text [text]="text" /> `,
})
export class CountdownComponent {
  constructor(public route: ActivatedRoute) {}
  text = ''
  FALLBACK_TEXT = 'Pick a date to display the countdown'
  interval: ReturnType<typeof setInterval> | undefined

  msToDateString(ms: number): string {
    if (ms <= 0) return 'Wow! Nu är det dags!'

    const totalSeconds = Math.floor(ms / 1000)
    const totalMinutes = Math.floor(totalSeconds / 60)
    const totalHours = Math.floor(totalMinutes / 60)
    const days = Math.floor(totalHours / 24)

    const seconds = totalSeconds % 60
    const minutes = totalMinutes % 60
    const hours = totalHours % 24

    const stringParts: string[] = []
    if (days) stringParts.push(`${days} ${days > 1 ? 'days' : 'day'}`)
    if (hours) stringParts.push(`${hours} ${hours > 1 ? 'hours' : 'hour'}`)
    if (minutes)
      stringParts.push(`${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`)
    if (seconds)
      stringParts.push(`${seconds} ${seconds > 1 ? 'seconds' : 'second'}`)

    return stringParts.join(', ')
  }

  setTextFromDate(dateString: string | null) {
    clearInterval(this.interval)
    if (!dateString) {
      this.text = this.FALLBACK_TEXT
      return
    }

    const date = new Date(dateString)
    const dateMs = date.getTime()

    const msToDate = dateMs - new Date().getTime()
    this.text = this.msToDateString(msToDate)

    this.interval = setInterval(() => {
      const msToDate = dateMs - new Date().getTime()
      this.text = this.msToDateString(msToDate)
    }, 1000)
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((p) => {
      this.setTextFromDate(p.get('date'))
    })
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
