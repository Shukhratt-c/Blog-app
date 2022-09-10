import React from 'react';

import { RichText } from '@graphcms/rich-text-react-renderer';

import moment from "moment";
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import Image from 'next/image';


const PostDetail = ({ post }) => {

  // const extension = path ? path.split(".").pop() : "";

  // React.useEffect(() => {
  //   import(`prismjs/components/prism-${extension}`).then(() => {
  //     Prism.highlightAll();
  //   })
    
  //   }, []);

  
  // Prism.plugins.autoloader.languages_path = 'path/to/grammars/';

  return (
    <>
      <div className="bg-white rounded-lg lg:p-8  pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            loading="lazy"
            alt=""
            className="object-top h-full w-full object-cover  rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="lg:mx-10 lg:px-0 md:p-8">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-blacl"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-4xl font-bold">{post.title}</h1>
          <RichText
        content={post.content.raw.children}
        renderers={{
          embed: {
            Post: ({ title, nodeId }) => {
              return (
                <div className="post">
                  <h3>{title}</h3>
                  <p>{nodeId}</p>
                </div>
              );
            },
          },
  
          ul: ({ children }) =>
             <ul className="ulInHYGraph font-light list-disc list-outside leading-loose tracking-wider text-lg my-4">{ children }</ul>,
          ol: ({ children }) => 
            <ol className="font-light text-black text-md leading-loose tracking-wider text-lg my-4">{ children }</ol>,

          
          code: ({ children }) => <code className="bg-gray-100 text-sm rounded ring-2 ring-gray-200 p-1">{children}</code>,
          h1: ({ children }) => <h1 className={`wfafsa`}>{children}</h1>,
          blockquote: ({ children }) => (
            <blockquote
              className="p-6 m-2 leading-loose tracking-wider font-light text-md"
              style={{
                paddingLeft: '22px',
                borderLeft: '4px solid grey',
                fontSize: '19px',
              }}
            >
              {children}
            </blockquote>
          ),
          a: ({ children, href, openInNewTab }) => (
            <a
              href={href}
              target={openInNewTab ? '_blank' : '_self'}
              style={{ color: 'blue' }}
              rel="noreferrer"
              className="underline"
            >
              {children}
            </a>
          ),
          h2: ({ children }) => (
            <h2 style={{ color: 'darkcyan' }}>{children}</h2>
          ),
          // img: ({ src, altText, height, width }) => (
          //   <Image
          //     src={src}
          //     alt={altText}
          //     height={height}
          //     width={width}
          //     objectFit="cover"
          //   />
          // ),
          p: ({ children }) => (
            <p className=' leading-loose tracking-wider text-black font-light text-lg'>{children}</p>
          ),
          bold: ({ children }) => <strong className="text-black font-bold">{children}</strong>,
          code_block: ({ children }) => {

            React.useEffect(() => {
              
                Prism.highlightAll();

              // languages_path = `https://unpkg.com/prismjs@latest/components/`
              
              }, []);  
            return (
              <div className="lg:py-8 md:py-4">
              <pre className="drop-shadow-xl rounded-md language-pug" data-dependencies="less">
                <code>{children}</code>
              </pre>
              </div>
            );
          },
          Asset: {
            application: () => (
              <div>
                <p>Asset</p>
              </div>
            ),
            text: () => (
              <div>
                <p>text plain</p>
              </div>
            ),
            image: ({ url, alt, width, height }) => {
              return (
                <Image
                  src={url}
                  alt={alt}
                  width={width}
                  height={height}
                />
              );
            },
          },
        }}
      />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
