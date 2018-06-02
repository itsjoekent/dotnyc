Each post gets a unique hex code (background color of the page as well?) (3 or 6 chars?) (Include hash?). This represents a subfolder on the system. Each content change creates a new immutable file in the subfolder. Each folder has a 'pointer' file which decides what the latest version is. This goes for non txt files as well. The API back end is basically an auth layer for granting editing permission and a simple file manipulation + streaming service. The front-end interprets the file and decides based on the type and content what chunks it needs to load asynchronously, for example:

- client side encryption
- password generator
- password masking / copy paste
- check-listing
- image gallery & media embeds
- file uploading & resizing
- diagrams? I obviously hate everything out there
- data viz??
- basically whatever, it's all loaded progressively and I don't care if it's not blazing fast

---------

joekent.nyc/#fff/rubber-ducks
            ^          ^
            |          |
         BG Color   Pathname


---------

Use string in document in mongodb for text storage
Use bindata + gridfs for file storage in mongodb

Keep the 'immutable' changes idea, we can always delete things we don't want anymore if space gets to be problematic. Keeps things simple & fault tolerant (fewer edge cases / codes to write).
