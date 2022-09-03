import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';



const PostWidget = ({categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);


  return (
    <div>
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-1">
          <div className="w-25 flex-none">
          <Link href={`/post/${post.slug}`} className="cursor-pointer" key={index}>
            <Image
              loader={grpahCMSImageLoader}
              unoptimized
              alt={post.title}
              height="80px"
              width="150px"
              className="align-middle rounded-md cursor-pointer"
              src={post.featuredImage.url}
            />
            </Link>
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="text-md cursor-pointer" key={index}>
              <span>{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default PostWidget