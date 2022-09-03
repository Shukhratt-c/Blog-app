import React, {useRef, useEffect} from 'react'
import ReactDOM from 'react-dom';
import { renderSimpleIcon, ICloud, SimpleIcon } from "react-icon-cloud";
import { DynamicCloud }from "../sections/SkillsCloud1";
import { invertBg, lightTheme, ThemeProvider } from "../hooks/useTheme";
import Footer from "../components/Footer";

export const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 40
    }
  },
  // https://www.goat1000.com/tagcanvas-options.php
  options: {
    clickToFront: 500,
    depth: 1,
    imageScale: 2,
    initial: [0.1, -0.1],
    outlineColour: "#0000",
    reverse: true,
    tooltip: "native",
    tooltipDelay: 0,
    wheelZoom: false
  }
}

export const renderCustomIcon = (icon: SimpleIcon, bg: string) => {
  return renderSimpleIcon({
    icon,
    minContrastRatio: bg === lightTheme.color ? 1.2 : 2,
    bgHex: bg,
    size: 42,
    fallbackHex: invertBg(bg),
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault()
    }
  })
}

const slugs = ['javascript', "flutter", 'tailwindcss',  'typescript', "nextdotjs", "firebase", "css3", "html5", "react", "npm", "nodedotjs", "graphql", ]


function About() {
  const ref = useRef();

  useEffect(() => {
    const el = document.getElementById('age');

    const interval = setInterval(() => {
      let time = (new Date().valueOf() - new Date(1121616240000).valueOf() ) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
      el.innerText = time.toString().substring(0, 12);
    }, 50);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <ThemeProvider>
    <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-0">
   <div className="container item-center justify-center">
      <div className="flex z-0  flex-wrap lg:justify-between -mx-4">
         <div className="w-full lg:px-16 md:px-12 xl:w-6/12 px-8">
            <div className="max-w-[570px] mb-12 lg:mb-0">
               <span className="block mb-4 text-base text-primary font-semibold">
               About
               </span>
               <h2
                  className="
                  text-dark
                  mb-6
                  uppercase
                  font-bold
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
                  >
                  THE HITCHKIKER'S GUIDE TO MY LIFE
               </h2>
               <p className="text-base text-body-color leading-relaxed mb-9">
                  Far out in the uncharted backwaters of unfashionable end of the Westren Spiral arm of the Galaxy lies a small unregarded yellow sun. 
                  Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant <strong>little blue green planet </strong>whose apedescended 
                  life forms are so amazingly primitive that they still think AI is a pretty neat idea... The planet where I have been living for <strong>the most of my life...</strong> 
                  <br/>
                  <br/>

                  You can skip the sentance above :')
                  <br/>
                  <br/>
                  <strong>In a nutshell</strong>
                  <br/>
                  I'm Shukhrat, <span id="age"></span><span> year-old developer who also lives, <strong>the other part of his life</strong>, in the software planet, breathes react, drinks tailwindcss, hangs out with Stack Overflow and GitHub
                  </span>
               </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
              <div className="bg-white relative rounded-lg p-8 sm:p-12">
                  <span className="block mb-4 text-md text-primary font-semibold">
                  my software planet
                  </span>
                 <DynamicCloud iconSlugs={slugs} />        
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </ThemeProvider>


  )
}

export default About
