# calvinWANG-3333.github.io

Personal site of **Ruihang (Calvin) Wang**, data analyst and analytics engineer in Paris.

**https://calvinwang-3333.github.io**

Plain HTML, CSS and JavaScript. No framework and no build step. English and French.

## How the page is laid out

| Section | What it is |
|---|---|
| Hero | Full-screen photograph of Paris; the `RUIHANG WANG / PARIS` lockup spans the page and shrinks into the header as you scroll |
| Collection | Index of every project, sliding up over the photograph; finished ones link to their room, upcoming ones are grey |
| Rooms | One screen per project: the work on a grey wall, the description beside it |
| Interlude | Full-screen image of the tower, out of focus; The House slides over it |
| The House | About, practice, a few lines off duty, on black, with the portrait |
| Experience | Internships, education, skills |
| Contact | Links on the dark wall beside a Paris window |

## Files

```
index.html              page shell; every section is filled from content.js
assets/js/content.js    ALL text and projects: the file you normally edit
assets/js/main.js       renders content.js, language switch, header, scroll motion
assets/js/vendor/       Lenis smooth scrolling (MIT licence)
assets/css/style.css    the design
assets/img/             photographs, project works, social preview, favicon
assets/fonts/           fallback typeface for systems without Helvetica
assets/cv/              put the CV PDF here
```

## Add a project

1. Put its image(s) in `assets/img/`, for example `work-forecast.jpg`. Images with a white background look best on the grey wall.
2. In `assets/js/content.js`, copy one block inside `projects` and edit it:
   - `id`: short, no spaces (`forecast`)
   - `title`, `year`, `stack`
   - `summary`: `{ en: "...", fr: "..." }`
   - `numbers`: two to four key figures
   - `links`: repository, live site
   - `work.prints`: one or two images with their pixel width and height, or `work.text` for a text piece
3. Remove the matching line from `upcoming`.

Projects appear in the order of the list.

## Add the CV

Put the PDF at `assets/cv/Ruihang_Wang_CV.pdf`, then set `cv: "assets/cv/Ruihang_Wang_CV.pdf"` in `content.js`. A CV link appears in Contact.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Motion

Smooth scrolling (Lenis), the lockup that shrinks into the header, sections that slide over pinned photographs, images that open like a curtain, and text that rises in. Everything is switched off for visitors who ask their system for reduced motion.

## Credits

Smooth scrolling: Lenis by darkroom.engineering, MIT licence (`assets/js/vendor/LENIS-LICENSE.txt`).

Typeface fallback: TeX Gyre Heros, GUST Font License (`assets/fonts/GUST-FONT-LICENSE.txt`). On Apple devices the page uses the system Helvetica Neue.
Photographs of Paris: by the author; two are generated in code.
Project data shown on this site is synthetic; not affiliated with any brand named here.
