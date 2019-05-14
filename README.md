# color-blind-AR

The following is a proof of concept application that will simulate how it would look if a person had one of the three main types 
of color blindness (red-green, blue-yellow or complete/monochromacy).

To run:

1.Clone down the Repo

2.Open up index.html in Google Chrome
Note: Please Run this in Google Chrome, the Web Speech API used is only supported in Google Chrome.

3.Allow Microphone Access and follow the prompt on the top of the page

Pitfalls in the application:
1. Browser Support/Mobile Support: the web speech API has only been built for Google Chrome, Other researched API's require a fee
2. Data manipulation: The application is able to paint the data from the video onto a canvas, was unable to simulate going through
the pixels to change it to the corresponding pixel for the color blind mode
3. If the user stops speaking after a while, the web speech API will stop listening, the application uses recursion to restart the
Web Speech API however it will prompt the user again to allow microphone access.
