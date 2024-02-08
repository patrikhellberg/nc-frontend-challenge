# Natural Cycles Frontend Challenge

## Visit app

[Natural Cycles | Frontend Challenge](https://natural-cycles.netlify.app/)

## Running locally

Make sure to have Angular CLI installed

[Angular CLI](https://angular.io/cli)

```shell
git clone https://github.com/patrikhellberg/nc-frontend-challenge.git
cd nc-frontend-challenge
ng serve

```

## Concepts

### Persisting data

The project is using the url query parameters to persist data between reloads. I preferred using query parameters over localstorage or a cookie since it allows a link to a specific event to be shared easily. A general input component connected to the query parameters was created in order to handle this in a simple way.

### Fitting text to viewport width

In order to be able to calculate the width of the text elements, the element needs to be measured and compared to the viewport width. This is because the contents of the string is mostly unknown and the width of individual characters differs for non-monospace fonts.
In order to achieve this the element is first rendered (to be able to measure it) with a 0px font-size, then measured. A while loop increases the fontsize gradually until it is as wide as the screen is.

An issue with this approach turned out to be that loading fonts take a small ammount of time. Since the font specified in the design is not a common font to have installed on your computer, the font first needs to be fetched before the text can be rendered with that font. Because the system default for sans-serif appears to have less wide letters on font weight 800 the calculation ended up rendering the text too wide.
In order to handle this, the text is first rendered transparent and when the font most likely has been fetched, the calculation is made and the opacity is set.

Since viewports might be resized, the setFontSize function is also passed to the callback of a window resize eventlistener.

To make the fullwidthtext more versatile, it takes an optional input determining which element should be rendered. This would easily be extended by accepting a wider range of values to the textElement input.

### Countdown

To handle counting down to the target date, the target date/time and current date/time is compared to get the difference. Then an interval runs every 1000ms (since the smallest increment shown to the user is 1s). The interval callback makes a new comparision and parses the result and sets the new text to be displayed. The parser also makes sure no negative values are handled and then instead indicates that the target date has been reached.
Each time the date changes the interval is cleared and a new interval is set. The interval is also cleared when the component is destroyed.

### Fallbacks

Since the query might not be populated the first time a user visits the application, the header and countdown instead displays instructions if the query paramaters are missing.

### Deviation from design

The date input obviously doesn't look exactly like the design. However I decided on using the native date type input since that would greatly improve the user experience. This could of course be styled to look like the design, but that would make it less clear to a user that it is in fact a date input.

Since Figma doesn't allow a guest user to display spacings between elements, many of the spacings are measured by eye.

## Future considerations

To improve the application further, I would consider setting the width of the fullwidthtext component using css transform. However this breaks the current requirement that it should be set using font-size. Using css transform would allow for measuring the element width once, and then from that measurement be able to calculate how to scale the element in order to fill the entire viewport width. That would mean running a lot less javascript on the client.

If this was a production application I would also considering doing an initial render on the server. Currently only the head of the application would be accessible to web crawlers, but with an initial server render it would be possible to add information valuable to improve search engine performance.

To make the user experience smoother I would also consider adding a css transition to the fulltextwidth component to make the width changes less yanky. However that becomes difficult with the current implementation using font-size. In a case where a css transform is used to set width, transitioning would be easier to implement.

Another consideration would be to make the application PWA compatible, since it might be a handy app to put on your phone home screen.

A small consistency improvement would also be to update the countdown text. Currently we use "days" for days and "h" for hours, it would be more consistent to abbreviate either all or none of the labels. Also there is a space between the hour value and the "h" in the design which as was not sure if it was intentional, so I removed it.

## Testing

This project has no tests. If this was to be relases as a production application there would of course be a need for at least unit tests. Since this is a code assignment and testing was not mentioned in the brief, tests have not been implemented. Please let me know if I should add tests.
