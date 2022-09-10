import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader, SkeletonCard } from '../../components';

const CategoryPost = ({ posts }) => {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts) {
      setTimeout(() => {
        setLoading(false)
        ;
      }, 10000);
    }
  }, [posts]);
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }
  const card =  Array(posts.length).fill(0);
  return (
    <div className="container mx-auto mt-8 px-8 mb-8">
      <div className=" grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:justify-center gap-5 grid-cols-1 z-20">
      {loading && card.map((index) => (
            <SkeletonCard key={index} />
          ))}
       {!loading && posts.map((post, index) => (<PostCard key={index} post={post.node} /> ))}
        <div className="lg:row-span-2 col-span-1 2xl:col-start-4 lg:col-start-3">
          <div className="relative lg:sticky top-24">
             <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}