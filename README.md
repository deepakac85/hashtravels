# Hash Travels — homepage concept

A responsive homepage mockup using the original logo, destination tiles, and a visual style aligned with https://hashtravels.com/: white backgrounds, purple-and-yellow accents, uppercase navigation, and sans-serif typography. This is a local interactive design mockup, not a live booking service.

## Open

Open `index.html` directly, or run `python3 -m http.server 8000` in this directory. No build step, account, or installation is needed. All runtime assets are included locally.

## Interactions

- Floating help icon opens a local quick-help panel for planning, destinations, and direct team contact. It is clearly marked as quick guidance rather than live chat.

- Destinations advance automatically every four seconds while visible, with previous/next controls, pause/play, and native touch swiping. Autoplay pauses on hover, keyboard focus, an open itinerary dialog, or a hidden browser tab; reduced-motion preference disables autoplay by default.
- Filter destination cards by coast, nature, and culture.
- Open a destination to preview a sample trip outline.
- Choose a destination, month, and travel group in the planner to create a personalised preview.
- The email enquiry link opens the user's mail app with a draft. It does not send an email automatically.
- Native dialog supports Escape, close button, and clicking outside; native keyboard focus is retained.

Copy, layout, and sample itineraries are design proposals. No prices, availability, customer counts, or ratings are asserted. Destination photos are illustrative. The company contact information and destination categories were read from the existing site.

## Files

- `index.html`: page content and layout
- `styles.css`: responsive purple, yellow, and cream theme
- `script.js`: filters, planner, and itinerary dialogs
- `assets/`: local photos and Geist font

## Asset sources

- Kerala houseboat hero: https://images.unsplash.com/photo-1602216056096-3b40cc0c9944
- Beach illustration: https://images.unsplash.com/photo-1507525428034-b723cf961d3e
- Forest illustration: https://images.unsplash.com/photo-1448375240586-882707db888b
- Karnataka, North India, and seasonal destination imagery: existing Hash Travels public homepage assets, under https://hashtravels.com/wp-content/uploads/2018/11/ . Original site notes photography courtesy of regional tourism boards and Google. These are included as reference assets for this mockup; confirm reuse rights for a production launch.
- Geist: SIL Open Font License, included in `assets/GEIST-OFL.txt`.

No changes were made to hashtravels.com.

## Expanded destination and hero slideshow update

The top landing picture crossfades every four seconds through Kerala, Kashmir, the Indian Himalayas, Ladakh, Rajasthan, and Goa. Previous/next and pause/play controls are provided. Autoplay pauses while the hero contains keyboard focus, while an itinerary dialog is open, when the hero is off-screen, or when the browser tab is hidden. Reduced-motion preference starts the slideshow paused.

Kashmir, Himalayas, Ladakh, Rajasthan, and Goa have been added to the destination carousel, planner, and sample itinerary previews. These are proposed destinations for the mockup; availability remains subject to discussion with Hash Travels.

Additional illustrative image sources:
- Kashmir: https://images.unsplash.com/photo-1614056965546-42fbe24eb36c
- Himachal Pradesh: https://images.unsplash.com/photo-1607836046730-3317bd58a31b
- Ladakh: https://images.unsplash.com/photo-1667597916946-74cfcbf7a92d
- Rajasthan: https://images.unsplash.com/photo-1661246709985-5f413432fc45
- Goa: https://images.unsplash.com/photo-1512343879784-a960bf40e7f2

## WhatsApp help

A floating WhatsApp button and an action in the help panel open `https://wa.me/919148049119` with a prefilled trip enquiry. The number is the business contact listed on the original Hash Travels site; WhatsApp availability has not been independently verified. Opening the link does not send a message. Visitors review and send the enquiry in WhatsApp themselves. Update the number in `index.html` and `script.js` if the business uses a different WhatsApp number.
