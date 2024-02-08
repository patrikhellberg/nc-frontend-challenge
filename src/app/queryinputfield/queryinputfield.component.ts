import { Component, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'query-input-field',
  standalone: true,
  imports: [],
  styleUrl: './queryinputfield.component.scss',
  templateUrl: './queryinputfield.component.html',
})
export class QueryInputFieldComponent {
  @Input({ required: true }) queryKey!: string
  @Input({ required: true }) label!: string
  @Input() fieldType = 'text'

  inputVal = ''

  constructor(public router: Router, public route: ActivatedRoute) {}

  onChange(e: any) {
    this.router.navigate([''], {
      queryParams: { [this.queryKey]: e.target.value },
      queryParamsHandling: 'merge',
    })
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((p) => {
      this.inputVal = p.get(this.queryKey) || ''
    })
  }
}
