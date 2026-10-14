# Event Management Project

A responsive multi-page event management website built with HTML, CSS, and JavaScript.  
It showcases services, pricing, booking, contact details, and user auth-style pages with rich animations and interactive UI components.

## Features

- Responsive landing page with section-based navigation
- Animated UI using GSAP (scroll effects, sliders, counters, carousels)
- Booking form for event inquiries
- Contact page with FAQ, testimonial carousel, and location map switching
- Dedicated pricing, login, and signup pages
- Dark/light mode toggle and searchable navigation elements

## Pages

- `index.html` – Main landing page (about, pricing, gallery, upcoming events, services)
- `booking.html` – Event booking form and hero content
- `contact.html` – Contact form, maps, testimonials, and FAQ
- `pricing.html` – Investment tiers/pricing presentation
- `login.html` – User login UI
- `signup.html` – User registration UI

## Tech Stack

- **HTML5**
- **CSS3** (`styles/index.css`, `styles/contact.css`)
- **Vanilla JavaScript** (`js/index.js`, `js/contact.js`)
- **Tailwind CSS (CDN)**
- **Flowbite (CDN)**
- **GSAP + Plugins (CDN)**
- **Font Awesome (CDN)**

## Project Structure

```text
event-management-project/
├── booking.html
├── contact.html
├── index.html
├── login.html
├── pricing.html
├── signup.html
├── js/
│   ├── contact.js
│   └── index.js
├── styles/
│   ├── contact.css
│   └── index.css
└── img/
```

## Getting Started

Because this is a static frontend project, no build step is required.

1. Clone the repository.
2. Open the project folder.
3. Launch `index.html` in your browser.

For the best experience, use a local server (so asset paths and browser policies behave consistently), for example:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500/index.html`.

## Customization Guide

- Update page content directly in the corresponding `.html` files.
- Modify visual styles in `styles/index.css` and `styles/contact.css`.
- Adjust animations/interactions in `js/index.js` and `js/contact.js`.
- Replace or add media assets under `img/`.

## Notes

- Forms are currently frontend-only and do not submit to a backend.
- Third-party libraries are loaded from CDNs, so internet access is required.

## License

No license file is currently included in this repository. Add a `LICENSE` file if you want to define usage terms.
