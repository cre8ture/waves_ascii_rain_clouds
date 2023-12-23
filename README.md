# Project Title: Spilling Characters Animation

This project is a creative coding animation built with JavaScript and p5.js. It simulates the visual effect of clouds spilling characters that fall down the screen, creating a rain-like effect.

## Features

- **Clouds**: The animation includes multiple clouds that move across the screen. Each cloud can spill characters at different intervals.

- **Spilling Characters**: Each cloud spills characters that fall down the screen. The characters are selected from a predefined string and are displayed at a random position around the cloud.

- **Twinkling Stars**: The animation also includes stars that twinkle in the background, adding to the visual effect.

- **Performance Optimizations**: The animation includes performance optimizations such as removing off-screen characters to ensure smooth performance.

## How It Works

The animation uses object-oriented programming principles. It defines classes for the clouds, the spilled characters, and the stars. Each class has methods to update its state and display itself.

The `spillCharacters` function is called in each frame to update and display the spilled characters. It checks if it's time for each cloud to spill a new character based on its `spillInterval`. If it's time, it creates a new `SpilledChar` object and adds it to the `spilledChars` array.

The `spillCharacters` function also checks if each spilled character is off-screen. If a character is off-screen, it's removed from the `spilledChars` array.

## How to Run

To run the animation, open the `index.html` file in a web browser. The animation will start automatically.

## Dependencies

This project uses the p5.js library for the animation. The p5.js library is imported via CDN