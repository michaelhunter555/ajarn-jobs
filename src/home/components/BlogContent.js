import React from "react";

import { DUMMY_BLOG } from "../../shared/util/DummyBlog";
import MainFeaturedPost from "./MainFeaturedPost";

const BlogContent = () => {
  return <MainFeaturedPost post={DUMMY_BLOG} />;
};

export default BlogContent;
