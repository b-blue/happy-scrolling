import { SettingsSuggestRounded } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Fab,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";

function Feed() {
  const [subredditInput, setSubredditInput] = useState("aww");
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]); // array of reddit data
  const [after, setAfter] = useState(""); // The last post
  const [key, setKey] = useState([]);

  const openImage = (e) => {
    e.preventDefault();
    console.log(key)
    
    console.log(key[e.target.name])
  };

  const getFeed = async (subredditInput) => {
    setLoading(true);
    await axios
      .get(
        `https://www.reddit.com/r/${subredditInput}/.json?limit=100&after=${after}`
      )
      .then((res) => {
        const results = res.data.data.children;
        let readKey = [];
        setAfter(res.data.data.after);
        //setFeed((feed) => [...feed, ...results]);
        setFeed(results);
        feed.map((post) => {
          //This needs to make an array of objects: [{url: bool}]
          readKey = { ...readKey, [post.data.url]: false };
        });
        setKey(readKey);
        setLoading(false);
      });
  };

  const handleClick = (e) => {
    console.log(feed[0]);
    e.preventDefault();
    getFeed(subredditInput);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getFeed(subredditInput);
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div>
        <Fab
          style={{
            marginTop: "50px",
            position: "fixed",
            minWidth: "450px",
            minHeight: "100px",
          }}
          variant="extended"
          onClick={handleClick}
        >
          <Typography variant="h4">Search</Typography>
        </Fab>
        <Box sx={{ flexgrow: 1 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={8}>
              <Stack>
                <Typography variant="h4">Search</Typography>
                <TextField
                  variant="outlined"
                  defaultValue={subredditInput}
                  onChange={(e) => {
                    setSubredditInput(e.target.value);
                  }}
                ></TextField>
              </Stack>
            </Grid>
            {feed.map((post, i) => {
              if (post.data.post_hint === "image") {
                return (
                  <Grid key={post.data.id + i} item xs={8}>
                    <Card>
                      <CardActionArea onClick={openImage}>
                        <CardHeader
                          title={
                            <Typography name={post.data.url} variant="h3">
                              {post.data.title}
                            </Typography>
                          }
                          subheader={
                            <Typography name={post.data.url} variant="h5">
                              {post.data.author}
                            </Typography>
                          }
                        />
                        <CardMedia
                          name={post.data.url}
                          sx={{ minHeight: "1000px", maxHeight: "1000px" }}
                          component="img"
                          image={post.data.url}
                        />
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {new Date(
                              post.data.created_utc * 1000
                            ).toDateString()}
                          </Typography>
                          <Typography variant="h6">
                            subreddit | {post.data.subreddit_id} - author |{" "}
                            {post.data.author_fullname} - post | {post.data.id}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <Backdrop
                        name={post.data.url}
                        sx={{
                          color: "#00695c",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={false}
                        onClick={() => {
                          return null;
                        }}
                      >
                        <img name={post.data.id} src={post.data.url} />
                      </Backdrop>
                      <CardActions>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              "https://www.reddit.com" + post.data.permalink,
                              "_blank"
                            );
                          }}
                        >
                          Visit on Reddit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Feed;
