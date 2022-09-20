# Discover Countries (REST)

Try it here: [Discover Countries](https://discover-countries-redsync.netlify.app)

This project was created as a challenge from [FrontendMentor](https://www.frontendmentor.io/home) - [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

## How to use?

This app shows data about all countries in the world. Home Page show all the countries fetch from [REST Countries API](https://restcountries.com/) and some basic information about them. There is an option to serach for specific country or filter them by continent. You can click on a specific country or visit [https://discover-countries-redsync.netlify.app/country/{country-alpha3Code}] to get more information about specific country. There is also an option to change a theme color to "Dark" or "Light"

## How it works?

I've used [REST Countries API](https://restcountries.com/) to fetch information about countries and then display it on screen. There is also an option to select specific country and see more detailed infomration.

## Used technologies:

For this project I used [React](https://reactjs.org/) w/ [TailwindCSS](https://tailwindcss.com/).

### React

Creating Single Page Application (SPA) with React is pretty simple now that React team made a toolchain "create-react-app". You can just run (assuming you have Node >= 14.0.0. and npm >= 5.6)

```bash
npx create-react-app
```

in your folder path and in a couple of seconds you have a running React App.

### Tailwind

According to official [Tailwind Documentation](https://tailwindcss.com/docs/) - Tailwind is "a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup."
Tailwind works perfectly with React because you can style your components in the same file you write their JSX markup.

### TypeScript

As we can read on [official Typescript page](https://www.typescriptlang.org/), TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. React has a great TypeScript support an once you get used to it, it provides a much better development experience.

## What Have I Learned?

In this section you can read in more details about packages I've used and what have I learned from this project.

### Setting up Theme Switcher with Context

React Context provides a way to pass data through the component tree without having to pass props down manually at every level. In some cases it can be used as a global state management (like switching a theme) but it's not recommended for state or data that changes pretty frequently.
Setting up theme switcher using Client Side Rendered (CSR) application is pretty simple using React Context. First thing you need to do is define create a Context. Theme context that works with TypeScript looks something like this:

```jsx
interface IThemeContext {
  dark: boolean;
  toggleTheme?: () => void;
}

const defaultState = {
  dark: true,
};

export const ThemeContext = React.createContext < IThemeContext > defaultState;
```

After we've created a context we need to wrap the component we want to have access to it's data with the Provider to which we pass the initial values of the data. There are 2 different ways we can do that. Wrapping the component with

```jsx
<ThemeContext.Provider value={{ dark, toggleTheme }}>
  {/* {someComponent} */}
</ThemeContext.Provider>
```

and handling the data changes directly in that component, or we can create a new component which will handle data changes and wrap other components with that component. Something like:

```jsx
export const ThemeProvider: FC = ({ children }) => {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

Now we can wrap entire App component with ThemeProvider component and we can access and mutate variables (data) in all child components using useContext() hook.

```jsx
const {dark, toggleTheme } = useContext(ThemeContext)

return (
  <button onClick=(toggleTheme)>{dark ? <span>Dark</span> : <span>Light</span>}</button>
)
```

That's it! We have a functional theme switcher!
