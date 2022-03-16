import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

const ViewArticle = (props) => {
  const { title, text, author } = props;

  return (
    <Card className="card">
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            variant="h5"
            component="div"
            className="card-heading"
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {text}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Author: {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ViewArticle;
