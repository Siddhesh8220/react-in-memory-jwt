import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import ViewArticle from "./ViewArticle";
import { getResource } from "../../services/apiService";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const blogsArr = await getResource("blogs");
        setBlogs(blogsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const buildCards = () => {
    let cards =
      blogs.length > 0 &&
      blogs.map((blog) => {
        return (
          <Grid item xs={12} key={blog.id}>
            <ViewArticle
              title={blog.title}
              text={blog.text}
              author={blog.author}
            />
          </Grid>
        );
      });

    return cards;
  };

  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h4">
            <b>Blogs</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container gap={5}>
            {/* blog cards */}
            {buildCards()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
