import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post}) => {

  return (
  <>
  <div className='bg-white  text-gray-700 mb-3 shadow-lg hover:shadow-xl rounded-lg overflow-hidden  pb-5 duration-300 ease-in-out transition-transform transform hover:-translate-y-1 w-full'>
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
                  <span className="px-3 py-1 my-2 rounded-lg text-xs bg-gray-100 cursor-pointer">
                      {category.name}
                    </span>
          </Link>
      ))}
        </div>

        <h1 className=" truncate ml-4 transition duration-200 mb-2 text-black cursor-pointer hover:text-blue-700 text-2xl font-bold">
        <Link 
         href={`/post/${post.slug}`}>{post.title || <Skeleton />}</Link>
        </h1>
      
        <p className=" text-sm text-gray-700 font-normal px-5 mb-2 line-clamp">
        {post.excerpt}
        </p>

        <div className=" flex flex-row text-center px-3 items-center justify-start w-full">
          <div className="flex items-center justify-center mb-0 w-auto mr-8 ">
            <span className="align-middle mt-1">{moment(post.createdAt).format('DD MMM YYYY')}</span>
          </div>
          <div className="flex items-center justify-center  ">
            <p className="font-bold text-2xl text-gray-700">-</p>
            <p className="inline align-middle ml-2 ">{post.read}</p>          
          </div>
        </div>
      </div>
    </div>
    
 </>

  )
}

export default PostCard
