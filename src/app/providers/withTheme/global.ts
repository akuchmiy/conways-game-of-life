import { createGlobalStyle } from 'styled-components'

type ThemeType = {
	theme: {
		color: string
		bg: string
	}
}

export const GlobalStyle = createGlobalStyle<ThemeType>`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: 	${(props) => props.theme.color};
		background-color: ${(props) => props.theme.bg};

		transition: color 0.2s ease-out, background 0.2s ease-out;
	}

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`
