import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post}) => {

  return (
  <>
  <div className='bg-white  text-gray-700 mb-3 shadow-lg hover:shadow-2xl rounded-lg overflow-hidden  pb-5 duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full'>
    <div className='overflow-hidden h-52  '>
      {/* <LoaderPlaceHolder/> */}
      <Link href={`/post/${post.slug}`}>
        <img
          unoptimized="true"
          alt={post.title}
          className="w-full rounded-t-lg cursor-pointer h-52 px-0.5 py-0.5 "
          layout="responsive"
          src={post.featuredImage.url} />
        </Link>
    </div>

      <div className=' px-5'>
        <div className='flex item-center flex-row gap-2 mb-2 w-full h-full'>
        {post.categories.map((category, index) => (
          <Link key={index} href={`/categories/${category.slug}
          `}>
            {/* {post.map((post: { title: Key | null | undefined }) => <PostCard post={post.node} key={post.title}  /> )} */}
                  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 cursor-pointer">
                      {category.name}
                    </span>
          </Link>
      ))}
        </div>

        <h1 className=" ml-4 transition duration-200 mb-2 text-black cursor-pointer hover:text-blue-700 text-2xl font-bold">
        <Link 
         href={`/post/${post.slug}`}>{post.title || <Skeleton />}</Link>
        </h1>
      
        <p className=" text-sm text-gray-700 font-normal px-5 mb-2">
        {post.excerpt}
        </p>

        <div className=" flex flex-row text-center px-3 items-center justify-start w-full">
          <div className="flex items-center justify-center lg:mb-0 w-full lg:w-auto mr-8 ">
            <Image
              unoptimized="true"
              alt={post.author.name}
              loader={grpahCMSImageLoader}
              height="20px"
              width="20px"
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-md">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle mt-1">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>

        </div>
      </div>
    </div>
    
 </>

  )
}

export default PostCard