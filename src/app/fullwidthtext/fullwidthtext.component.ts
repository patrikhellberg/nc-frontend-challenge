import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'full-width-text',
  standalone: true,
  imports: [],
  templateUrl: './fullwidthtext.component.html',
})
export class FullWidthTextComponent {
  @Input({ required: true }) text!: string
  @Input() textElement: 'h1' | 'p' = 'p'

  @ViewChild('container', { static: true })
  public container: ElementRef<HTMLDivElement> | null = null

  setFontSize(text: string) {
    const container = this.container?.nativeElement
    const INITIAL_FONT_SIZE = 16
    if (!container || !text) return

    container.innerHTML = ''

    const element = document.createElement(this.textElement)
    element.innerText = text
    element.style.fontSize = `${INITIAL_FONT_SIZE}px`
    container.appendChild(element)

    const resizeFactor =
      element.getBoundingClientRect().width / window.innerWidth
    const targetFontSize = INITIAL_FONT_SIZE / resizeFactor
    element.style.fontSize = `${targetFontSize}px`
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setFontSize(changes['text'].currentValue)
  }

  ngOnInit() {
    /**
     * Timeout is needed since font doesn't load
     * instantly. The font needs to be loaded
     * before width is calculated
     */
    setTimeout(() => {
      if (this.container) {
        this.container.nativeElement.style.transition =
          'opacity 500ms ease-in-out'
        this.container.nativeElement.style.opacity = '100'
      }
      this.setFontSize(this.text)
    }, 500)

    window.addEventListener('resize', () => {
      this.setFontSize(this.text)
    })
  }
}
