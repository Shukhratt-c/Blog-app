import React from "react";

const styles: Record<string, React.CSSProperties> = {
  root: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute"
  }
};

export type Theme = {
  name: string;
  color: string;
};

export const lightTheme: Theme = {
  color: "#fff",
  name: "light"
};

export const darkTheme: Theme = {
  color: "#000",
  name: "dark"
};

const themeContext = React.createContext<Theme>(undefined);

export const invertBg = (color: string) =>
  color === lightTheme.color ? darkTheme.color : lightTheme.color;

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>(lightTheme);
  const toggle = React.useCallback(() => {
    setTheme((prev) => {
      if (prev.name === "light") {
        return darkTheme;
      }
      return lightTheme;
    });
  }, []);
  return (
    <themeContext.Provider value={theme}>
      <div style={{ ...styles.root, backgroundColor: theme.color }}>
        <button onClick={toggle}>toggle theme</button>
        {props.children}
      </div>
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = React.useContext(themeContext);

  if (!theme) {
    throw new Error("useTheme must be used within a theme provider");
  }

  return theme;
};

export const ThemedH1 = ({ text }: { text: string }) => {
  const { color } = useTheme();
  return (
    <h1
      style={{
        textTransform: "capitalize",
        display: "flex",
        justifyContent: "center",
        color: invertBg(color),
        textAlign: "center"
      }}
    >
      {text}
    </h1>
  );
};
