import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'full-width-text',
  standalone: true,
  imports: [],
  templateUrl: './fullwidthtext.component.html',
})
export class FullwidthtextComponent {
  @Input({ required: true }) text!: string;
  @Input() textElement: 'h1' | 'p' = 'p';

  @ViewChild('container', { static: true })
  public container: ElementRef<HTMLDivElement> | null = null;

  fontSize = 0;

  setFontSize(text: string) {
    const PADDING = 32;
    const container = this.container?.nativeElement;
    if (!container || !text) return;

    this.fontSize = 0;
    container.innerHTML = '';

    const element = document.createElement(this.textElement);
    element.innerText = text;
    element.style.fontSize = '0';
    container.appendChild(element);

    while (
      element.getBoundingClientRect().width + PADDING <
      window.innerWidth
    ) {
      element.style.fontSize = `${this.fontSize}px`;
      this.fontSize++;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setFontSize(changes['text'].currentValue);
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
          'opacity 500ms ease-in-out';
        this.container.nativeElement.style.opacity = '100';
      }
      this.setFontSize(this.text);
    }, 500);

    window.addEventListener('resize', () => {
      this.setFontSize(this.text);
    });
  }
}
