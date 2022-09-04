/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { getCategories, getSimilarPosts, getRecentPosts  } from '../services'
import logo from "../public/Icon.png"



const callsToAction = [
  { name: 'Contact', href: '/contacts', icon: PhoneIcon },
]
const resources = [
 
  {
    name: 'Contacts',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '/contacts',
    icon: CalendarIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ post }) {
  const [categories, setCategories] =  useState([]);
  
useEffect(() => {
  getCategories().then((newCategories) => {
    setCategories(newCategories);
  });
}, []);

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() =>  {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    
  }, []);

  const router = useRouter();
  const currentRoute = router.pathname;



  return (
    // bg-slate-100
    <Popover 
    className="sticky top-0 z-30  bg-white">
      <div className="max-w-6xl mx-auto border-b w-full border-blue-400 sm:px-10">
        <div className="sticky z-10 top-0 flex justify-between items-center py-3 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
                <a className="flex items-center cursor-pointer font-bold text-4xl text-black"> <Image
                    className=" w-auto"
                    width={70}
                    height={70}
                    src={logo}
                    alt="Sh"
                  />ukhratt</a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-5">
              <Link href="/"  >
                <a className={classNames(currentRoute === "/" ? 'bg-gray-200' : 'bg-white',
                      'group bg-white p-2 px-3  rounded-md inline-flex items-center text-base font-semibold hover:bg-gray-200 ')} >Home</a>
              </Link>

            <Popover className="relative ">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'bg-gray-200' : 'bg-white',
                      // currentRoute === ['/',`/about`, `/contacts`  ] ? 'bg-white' : 'bg-gray-200',
                      'group bg-white p-2 px-3 rounded-md inline-flex items-center text-base font-semibold hover:bg-gray-200 '
                    )}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ?  'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 ">

                        {categories.map((category, index) => (
                            <Link
                            key={index.toString()} 
                            href={`/categories/${category.slug}`}
                            >
                              <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                              <ChartBarIcon className="flex-shrink-0 mx-2 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                <p className="text-base font-medium text-gray-900">{category.name}</p>
                              </a>
                            </Link>
                          ))}
                        </div>
                        <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                          {callsToAction.map((item) => (
                            <div key={item.name} className="flow-root">
                              <a
                                href={item.href}
                                className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                              >
                                <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                <span className="ml-3">{item.name}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <Link href="/about"  >
                <a className={classNames(currentRoute === "/about" ? 'bg-gray-200' : 'bg-white',
                      'group bg-white p-2 px-3 rounded-md inline-flex items-center text-base font-semibold hover:bg-gray-200 ')} >About</a>
              </Link>

              <Link href="/contacts"  >
                <a className={classNames(currentRoute === "/contacts" ? 'bg-gray-200' : 'bg-white',
                      'group bg-white p-2 px-3 rounded-md inline-flex items-center text-base font-semibold hover:bg-gray-200 ')} >Contacts</a>
              </Link>


          </Popover.Group>
          {/* <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              Sign in
            </a>
            <a
              href="#"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </a>
          </div> */}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-10">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-12 w-auto"
                    src="Icon.png"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              
              <div className="mt-6">
              <h4 className="font-bold text-dark text-xl mb-1">Categories</h4>
                <nav className="grid gap-y-8">
                {categories.map((category, index) => (
                <Link 
                key={index.toString()} 
                href={`/categories/${category.slug}`}
                ><a>{category.name}</a></Link>
               ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-x-8">

                <a href="/about" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 font-bold text-dark text-xl mb-1">
                 About
                </a>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 font-bold text-dark text-xl mb-1"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className=" text-center flex justify-center p-4 mb-7 ">
              <a href="https://www.facebook.com/profile.php?id=100022507969113" className="mr-9 text-gray-500">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  className="svg-inline--fa fa-facebook-f w-2.5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
              <a href="https://t.me/shukhratt_c" className="mr-9 text-gray-500">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    width="17" height="17" 
                    fill="currentColor" 
                    className="bi bi-telegram" 
                    viewBox="0 0 16 16"
                > 
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/> 
                </svg>
              </a>
              
              <a href="https://www.linkedin.com/in/shuhrat-tc-41a06a236" className="mr-9 text-gray-500">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="linkedin-in"
                  className="svg-inline--fa fa-linkedin-in w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  ></path>
                </svg>
              </a>

              <a href="https://github.com/Shukhratt-c" className="text-gray-500">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  className="svg-inline--fa fa-github w-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
