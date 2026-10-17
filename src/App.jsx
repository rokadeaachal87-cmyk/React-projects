import React from 'react'
import "./index.css"
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ReactCrop from 'react-image-crop'


function App() {
  const [showcanvas, setcanvas] = useState(false);
  const headingref = useRef(null);
  const growingspan = useRef(null);

  useEffect(() => {
    const locomotivescroll = new LocomotiveScroll();
  }, [showcanvas]);

  useEffect(() => {
    const handleClick = (e) => {
      setcanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingspan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingspan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingspan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return <>
    <span ref={growingspan} className='growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5'></span>
    <div background-color='#fd2c2a' className='w-full relative min-h-screen '>
      {showcanvas && data[0].map((canvasdets, canvasIndex) => (
        <Canvas key={canvasIndex} details={canvasdets} />
      ))}
      <div className='w-full h-screen relative z-[1]  '>

        {/* Basic Navbar with array links */}
        {(() => {
          const navLinks = [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Projects", href: "/projects" },
            { name: "Contact", href: "/contact" },
          ];
          return (
            <nav className="w-full  bg-red/600 justify-between p-8  z-50 flex ">
              <div className='brand text-2xl text-white, font-bold '>Thirtysixstudios</div>
              <ul className="flex  gap-10 space-x-8">
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className=" hover:text-yellow-300 text-md font-medium transition"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          );
        })()}


        <div className='textcontainer px-[20%] w-full z-[1] '>
          <div className='text w-[50%]'>
            <h3 className='text-3xl  leading-9.5'>
              At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
            </h3>
            <p className='text-md w-[90%] mt-10 font-normal'>
              We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
            </p>
            <p className='text-md mt-10'>scroll</p>
          </div>
        </div>

        <div className='w-full absolute bottom-0 left-0'>
          <h1 ref={headingref} className='text-[17rem]   font-normal tracking-tight leading-none p-10'>
            Thirtysixstudios
          </h1>

        </div>


      </div>
    </div>
    {showcanvas && data[1].map((canvasdets, canvasIndex) => (
      <Canvas key={canvasIndex} details={canvasdets} />
    ))}
    <div className='w-full relative h-150 z-50  mt-32 px-10'>
    
   
      <h1 className="text-8xl tracking-tighter">About The Brand</h1>
      <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
        we are a team of designers, developers, and strategists who are
        passionate about creating digital experiences that are both beautiful
        and functional, we are a team of designers, developers, and
        strategists who are passionate about creating digital experiences that
        are both beautiful and functional.
      </p>
      {showcanvas && data[3].map((canvasdets, canvasIndex) => (
        <Canvas key={canvasIndex} details={canvasdets} />
      ))}
      <img className='relative rounded-4xl mt-10 z-[0]' src="https://images.unsplash.com/photo-1690090903465-0ddb537e0fc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDczfHx8ZW58MHx8fHx8" alt="" />

  
    </div >

  </>
};

export default App
