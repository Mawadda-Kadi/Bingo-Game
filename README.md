# Bingo Game Documentation

- Here is the deployed site [Bingo Card Game](https://mawadda.vercel.app/)

---

## Overview 🚀🎲
The **Bingo Game** is a web-based interactive game where users can play a digital version of the traditional Bingo card game. Players can generate a randomized Bingo card, draw numbers, and check for winning conditions. The game includes a mute option and a speech function to announce drawn numbers.

![Image](https://github.com/user-attachments/assets/2524cab1-372c-4f2f-aa24-589316549b58)

---

## Purpose and Goals
The purpose of this project is to provide an engaging and interactive way for users to play Bingo online. The primary goals include:
- Allowing users to generate randomized Bingo cards.
- Enabling a "Draw Number" functionality to randomly pick numbers.
- Checking for winning conditions (rows, columns, and diagonals).
- Enhancing accessibility with a text-to-speech feature for announcing drawn numbers.
- Providing an intuitive and user-friendly interface.

---

## Target Audience
This game is designed for:
- Casual gamers looking for a fun, interactive experience.
- Bingo enthusiasts who enjoy playing the game in a digital format.
- Seniors or individuals who prefer an easy-to-use and accessible game.
- Teachers or event organizers who want to use Bingo in classroom activities or social events.

---

## User Experience (UX) Enhancements
To ensure a smooth and enjoyable user experience, the game includes:
- A simple and clean interface with easy-to-read Bingo cards.
- A responsive design for seamless gameplay on different screen sizes.
- A "FREE" space in the center of the card for standard Bingo rules.
- A mute button to allow players to toggle sound on/off.
- A speaker button to announce drawn numbers using the Web Speech API.
- A visual indicator (highlighted cells) for marked numbers.

---

## Key Features
- **Randomized Bingo Card Generation**: Players get a unique Bingo card every time they start a game.
- **Number Drawing System**: The system ensures no duplicate numbers are drawn.
- **Winning Condition Check**: The game automatically detects winning patterns (rows, columns, diagonals).
- **Text-to-Speech Announcement**: The game can verbally announce drawn numbers for enhanced accessibility.
- **Mute/Unmute Option**: Players can control whether they want audio announcements.
- **User-friendly UI**: Simple, readable card design with interactive elements.

---

## Future Enhancements
To improve the Bingo Game, the following features and fixes are planned for future updates:

### 1. Add Instruction Section
- Introduce a dedicated **"How to Play"** section to guide new users.
- Include step-by-step instructions on generating a card, drawing numbers, and winning conditions.

### 2. Add New Game Feature
- Implement a **"New Game"** button to reset the game without refreshing the page.
- Ensure a fresh Bingo card is generated, and drawn numbers are cleared.
- Allow users to play multiple rounds without restarting the browser.

### 3. Fix the Sound: Stop When Drawing the Next Number
- Modify the speech synthesis logic so that when a new number is drawn, the previous number’s speech **stops immediately**.
- Implement the `speechSynthesis.cancel()` method before playing the new number announcement.
- Ensure smooth and clear voice output for better user experience.

---

## Languages
The Bingo game is built using:
- **HTML**: Structuring the web page.
- **CSS**: Styling the interface for a visually appealing design.
- **JavaScript**: Implementing the game logic and interactivity.

---

## Framework, Libraries, and Tools
The following tools and libraries are used:
- **Font Awesome**: For icons (e.g., the microphone icon for speech functionality).
- **Google Fonts**: To enhance typography.
- **Web Speech API**: To provide text-to-speech functionality.

---

## Technologies:
- **Vercel**: For deployment.

---