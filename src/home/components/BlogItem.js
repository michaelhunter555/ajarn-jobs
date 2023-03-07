import "./BlogItem.css";

import React from "react";

import { Link } from "react-router-dom";

//import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

const BlogItem = (props) => {
  const { posts } = props;
  return (
    <Card className="blog-container">
      <div className="blog-item first-post">
        <h2>{posts[0].title}</h2>
        <div className="post-details">
          <img src={posts[0].image} alt={posts[0].title} />
          <p>{`${posts[0].content.substring(0, 40)}...`}</p>
          <p>By {`${posts[0].author} on ${posts[0].datePosted}`}</p>
        </div>
      </div>
      <div className="blog-list">
        {posts.slice(1).map((post, i) => (
          <Link key={i} className="blog-item">
            <h2 className="blog-item__title">{post.title}</h2>
            <p className="blog-item__author">
              By {post.author} on {post.datePosted}
            </p>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default BlogItem;
