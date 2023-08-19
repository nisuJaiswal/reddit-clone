"use client";
import { ExtendedPost } from "@/types/db";
import { FC, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_SUBREDDITS } from "@/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import Post from "./Post";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName?: string;
}

const session = useSession();

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef<HTMLElement>(null);

  //   For ref
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  //   Tenstack Infinite Scroll
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-scroll"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_SUBREDDITS}&page=${pageParam}` +
        (!!subredditName ? `&subredditname=${subredditName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [initialPosts],
        pageParams: [1],
      },
    }
  );
  console.log(data);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        // Handling UpVotes and DownVotes
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;

          return acc;
        }, 0);

        // Checking if already Voted
        const currentVote = post.votes.find(
          // @ts-ignore
          (vote) => vote.userId === session?.user.id
        );
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post />
            </li>
          );
        } else {
          return <Post />;
        }
      })}
    </ul>
  );
};

export default PostFeed;