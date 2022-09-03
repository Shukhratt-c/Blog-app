import type { NextPage } from 'next'
import { Key } from 'react'
import { PostCard, PostWidget, About, SkeletonCard } from "../components"
import { getPosts} from '../services'
import { FeaturedPosts } from '../sections'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import ReactPaginate  from "react-paginate"

import React, { useEffect, useState } from 'react'

export default function Home({post}: any ) {  
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0)

  const postsPerPage = 10
  const pagesVisited = pageNumber * postsPerPage 



  useEffect(() => {
    if (post) {
      setTimeout(() => {
        setLoading(false)
        ;
      }, 30000);
    }
  }, [post]);

  const pageCount = Math.ceil(post.length / postsPerPage);

  const changePage = ({selected}: any) => {
    setPageNumber(selected);
    window.scrollTo(0, 540)
  };

  const card =  Array(post.length).fill(0);


  //Initialize an array of length 13 and fill it with 0's

  return (
    <React.Fragment>
    <div className="container mx-auto px-10 mb-8">
      <div>
          <About />
      </div>
      <div className="z-20">
            <FeaturedPosts/>
      </div>

      <div className=" grid lg:grid-cols-3 2xl:px-8 2xl:grid-cols-4 col-start-1 row-start-1  md:grid-cols-2 sm:justify-center gap-5 grid-cols-1 z-20">

          {loading ? card.map((index: number) => {
            return (
            <SkeletonCard key={index} />
            )
          }) : post.slice(pagesVisited, pagesVisited + postsPerPage).map((post: any) => ( <PostCard post={post.node} key={post.title}  /> )) }
        <div className=" lg:row-span-2 col-span-1 lg:col-start-3 2xl:col-start-4">
          <div className='lg:sticky  relative'>  
            <PostWidget categories={undefined} slug={undefined}  />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">

        <ReactPaginate 
            previousLabel= {"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"flex flex-1 justify-between sm:hidden"}
            pageClassName={'hidden relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'}
            previousLinkClassName={"relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}
            nextLinkClassName={"relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"}
          />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{post.length}</span> Articles so far
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <ReactPaginate 
            previousLabel= {<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
            nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"relative z-0 inline-flex -space-x-px rounded-md shadow-sm"}
            pageClassName={'relative cursor-pointer inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50'}
            previousLinkClassName={"relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"}
            nextLinkClassName={"relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"}
            disabledClassName={"focus:outline-none disabled:opacity-100 hover:none text-gray-100 bg-gray-50"}
            activeClassName={"inline-flex z-20 px-4 py-2 text-blue-600 bg-blue-50 border border-blue-500 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"}
          />
          </nav>
        </div>
      </div>
    </div>
  </div>
  </React.Fragment>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const post = (await getPosts()) || [];
  return {
    props: { 
      post, 
     },
  };
}
