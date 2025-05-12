# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![Todo App Screenshot](./design/desktop-preview.jpg)


### Links

- Solution URL: [live Demo]()

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Vanilla JavaScript
- Local Storage for data persistence
- Mobile-first responsive design
- Drag and drop API

### What I learned

This project was a great opportunity to practice building a fully functional application with vanilla JavaScript. Some key learnings include:

- Implementing a theme toggle (light/dark mode) with CSS variables and JavaScript
- Using localStorage to persist user data
- Creating a drag and drop interface for reordering items
- Building a responsive design that works well on both mobile and desktop
- Managing application state and rendering based on filters

Here's a code snippet showing how the theme toggle functionality was implemented:

```js
// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  themeIcon.src = isDarkTheme ? './images/icon-sun.svg' : './images/icon-moon.svg';
  localStorage.setItem('darkTheme', isDarkTheme);
});
```

The CSS variables made it easy to switch between themes:

```css
:root {
  /* Light Theme */
  --very-light-gray: hsl(0, 0%, 98%);
  --very-light-grayish-blue: hsl(236, 33%, 92%);
  /* ... other light theme variables ... */

  /* Dark Theme */
  --very-dark-blue: hsl(235, 21%, 11%);
  --very-dark-desaturated-blue: hsl(235, 24%, 19%);
  /* ... other dark theme variables ... */
}

body.dark-theme {
  background-color: var(--very-dark-blue);
  background-image: url('./images/bg-desktop-dark.jpg');
}
```

### Continued development

In future projects, I'd like to focus on:

- Improving accessibility features
- Adding animations for a more polished user experience
- Implementing more advanced drag and drop functionality
- Exploring frameworks like React for state management in larger applications

### Useful resources

- [MDN Web Docs](https://developer.mozilla.org) - Comprehensive documentation for HTML, CSS, and JavaScript.
- [CSS-Tricks](https://css-tricks.com) - Great resource for CSS techniques and flexbox guides.
- [JavaScript.info](https://javascript.info) - Detailed explanations of JavaScript concepts.

## Author

- Frontend Mentor - [@Ayokanmi-Adejola](https://www.frontendmentor.io/profile/Ayokanmi-Adejola)

## Acknowledgments

Thanks to Frontend Mentor for providing this challenge and to the community for their support and feedback.
