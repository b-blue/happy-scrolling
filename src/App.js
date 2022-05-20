import Feed from "./components/Feed.jsx";
import "./App.css";
import useInifniteScroll from "./hooks/useInfiniteScroll.jsx";
import useAxios from "./hooks/useAxios.jsx";
import PhotoCard from "./components/PhotoCard";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

function App() {
  const darkTheme = createTheme({
    palette: { mode: "dark" },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
        <Feed />
      </ThemeProvider>
    </>
  );
}

export default App;
