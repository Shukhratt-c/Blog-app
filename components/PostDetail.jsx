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
        <div className="relative overflow-hidden shadow-md lg:mb-6">
          <img
            src={post.featuredImage.url}
            loading="lazy"
            alt=""
            className="object-top h-full w-full object-cover  rounded-t-lg lg:rounded-lg"
          />
        </div>
          <div className="lg:text-md text-sm flex items-center mb-8 w-full">
            <div className=" flex flex-row text-center lg:px-2 items-center justify-start w-full">
            <div className="flex items-center mt-2 justify-center mb-0 w-auto">
              <span className="align-middle">{`Updated at ${moment(post.updatedAt).format('DD MMM YYYY')}`} </span>
            </div>
          </div>
          </div>
        <div className="lg:mx-10 lg:px-0 md:p-8">
          <h1 className="mb-8 text-3xl lg:text-4xl font-bold">{post.title}</h1>
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
          h1: ({ children }) => <h1 className="font-bold text-4xl">{children}</h1>,
          h2: ({ children }) => <h2 className="font-bold text-3xl">{children}</h2>,
          h3: ({ children }) => <h3 className="font-bold text-2xl">{children}</h3>,
          h4: ({ children }) => <h4 className="font-bold text-xl">{children}</h4>,
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
            <p className='lg:py-4 py-2 lg:leading-loose lg:tracking-wider text-black lg:font-light sm:text-gray-500 sm:text-md lg:text-lg'>{children}</p>
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
                  className='lg:py-4 py-2'
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
