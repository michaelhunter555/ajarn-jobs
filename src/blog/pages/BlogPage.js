import React from "react";

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Footer from "../../shared/components/UIElements/Footer";
import BlogPageItem from "../components/BlogPageItem";

const BlogPage = () => {
  const blogId = useParams().bid;
  // const [content, setContent] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getBlogPostById = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_BLOG}/post/${blogId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(
  //           "There was an error retreiving the blog details for this post."
  //         );
  //       }
  //       const data = await response.json();
  //       setContent(data.blogPost);
  //       setIsLoading(false);
  //       return data.blogPost;
  //     } catch (err) {
  //       setIsLoading(false);
  //       console.log(err);
  //     }
  //   };
  //   getBlogPostById();
  // }, [content, blogId]);

  const getBlogPostById = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BLOG}/post/${blogId}`
      );
      if (!response.ok) {
        throw new Error(
          "There was an error retreiving the blog details for this post."
        );
      }
      const data = await response.json();
      return data.blogPost;
    } catch (err) {
      console.log(err);
    }
  };

  const {
    data: content,
    refetch,
    isLoading,
  } = useQuery(["blogDetails"], () => getBlogPostById());

  //blog list
  const getBlogList = async () => {
    const response = await fetch(`${process.env.REACT_APP_BLOG}`);

    if (!response.ok) {
      throw new Error(
        "There was an error retreiving the blog details for this post."
      );
    }

    const data = await response.json();
    return data.blogList;
  };

  const { data: blogList } = useQuery(["otherContentPosts"], () =>
    getBlogList()
  );

  return (
    <>
      <BlogPageItem
        content={content}
        refetchLikeState={refetch}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
};

export default BlogPage;
