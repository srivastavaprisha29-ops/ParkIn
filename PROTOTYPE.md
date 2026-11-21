# ParkIn prototype

Serve the repository root with `python3 -m http.server 8000`, then visit http://localhost:8000. The prototype uses plain HTML, CSS and JavaScript.

Browse the sample Bengaluru listings by name, neighbourhood, vehicle and hourly price. Use **List a spot** to add a listing and reload the page to see it persist in the same browser. Open the prototype in a private window to start with the sample listings.

Choose **Reserve (demo)** on a listing, select an arrival time in Bengaluru (IST) and a duration, and confirm to save the quote and reservation on this device. Reload to see the reservation persist. Overlapping reservations for the same spot are blocked on this browser, and cancelling an upcoming reservation frees its time in the demo. Older reservations remain visible without a scheduled time.

The sample spots are fictional. Demo reservations have no effect on availability and do not collect payment. This version has browser-local storage. Shared inventory, accounts, real reservations and payments would require additional app and server work.
