# Student Display: notes for Claude

Interactive maths displays for a NZ Year 7–8 classroom, shown on a classroom TV (1920×1080), Chromebooks (1366×768) and MacBooks. Built and maintained with James (teacher, Deputy Principal, ICT lead).

Also read `TODO.md` for small fixes still to do, and `curriculum-groupings/README.md` for the year-level plan.

## How the site is hosted
- **GitHub Pages** serves the `main` branch at `https://tactialteaching.github.io/student-display/`.
- `index.html` redirects to `home.html`.
- Pages must also still work inside **Google Apps Script** (`Code.gs` serves each `.html` file by name). Keep both working.

## Drafts and published
- Work on your own `claude/...` branch (drafts). Do **not** push to `main` until James says "publish it".
- To publish: fast-forward `main` to the drafts branch (or open a pull request if James asks).
- If another chat may also be editing `home.html` or a section menu page, check `main` first and rebase onto it before publishing.

## Page structure
- One self-contained HTML file per page: inline CSS and JS, no frameworks, no build step, no external files.
- **Navigation**: links use `href="addition.html" data-page="addition"`. A click handler uses `google.script.run.loadPage(...)` when inside Apps Script (with `withFailureHandler` showing an alert), otherwise the normal link works.
- Menus: `home.html` → section pages (`number.html`, `operations.html`, `geometry.html`) → tool pages.
- Topics not built yet stay on the menu as faded, unclickable tiles (`is-inactive`, 10% opacity). Switch them on when the page is built.
- New tool pages must be added to their section menu (and the home tile switched on if it is a new section).

## Tool page layout (copy an existing page, e.g. `addition.html`)
- Full-screen, **no scrolling** at 1920×1080, 1920×970, 1366×768, 1366×657, 1470×830 and 1512×856.
- Top bar: yellow Home and Back buttons, grey title banner, year badge on the right.
- Left column: **Year 3–8** buttons (only the years the curriculum uses, e.g. Years 6–8 for complementary angles), then Controls: New Question, Reveal Next, Reveal All, Cover Workout / Hide Answer.
- Centre: question box, then the workout board, then an **explanation bar** that describes each step in plain English.
- Right column: collapsible **Helpful Hints**.
- Workings start covered ("Set it up in your book") so students set up the question first, then reveal one step at a time. Carry/exchange squares stay hidden until their turn.
- Boxes resize with JS (`fitBoard`) to fit the space. Spacing between boxes is 14% of the box size.

## Style
- Colours: ink `#18212f`, green `#177b63`, yellow `#f0c958`, slate `#c6ccd2`, coral `#d96d5c`, blue `#315f9f`, red lines `#c0392b`. Light grid background.
- Divider lines under sums are **red**.
- Decimal point: a small dot (6% of box width, min 4px) in the normal gap after the ones digit, level with the bottom of the boxes, centred (account for the 2px box border). Do not give the point its own column.
- Subtraction exchanges: lending digit crossed out with the new value in a small square above the top-left; a column exchanged twice stacks the newer value above the crossed-out older one; a digit that only receives gets a small 1 tucked in front.
- Screen use only: no print styles.

## Maths content
- Follow the Science of Learning, Teach Like a Champion and I do / we do / you do.
- Questions generate randomly per year. Check the maths on hundreds of generated questions before publishing.
- Language: NZ English (e.g. "exchanging", "maths").

## Testing before saying something is done
- Use Playwright (pre-installed) to: run every year, step through reveals, check for console errors, and check no scrolling on the screen sizes above.
- Look at screenshots, and measure positions on screen when alignment matters (don't trust calculations alone).
- Send James a claude.ai preview link for visual changes.
