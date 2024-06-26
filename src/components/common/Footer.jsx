import React from 'react';
import logo from "../../assets/logo.png"
import { Link as ScrollLink } from 'react-scroll';
import { NavbarLinks } from  "../../data/navabarlinks"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-indigo-500 border-slate-50 text-white py-20 mt-20 text-white-25 font-semibold">
      <div className="container mx-auto grid sm:grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Column 1 */}
        <div className='flex flex-col gap-2 items-center'>
            <Link to={"/"} className="flex items-center top-20 text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              Servi<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">cehub</span>
            </Link>
          <p className='text-base max-w-[300px]'>Where Needs Meet Solutions.</p>
        </div>

          {/* Column 2 */}
        <div className='lg:flex lg:justify-between grid grid-cols-2 lg:gap-16 gap-8'>
          <div className='lg:flex flex-col gap-2 place-content-end grid'>
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            {NavbarLinks.map((link, index) => (
              <p key={index} className='cursor-pointer'>
                <ScrollLink
                  to={link.path}
                  smooth={true}
                  duration={1000}
                  offset={-70}
                  spy={true}
                  exact="true"
                  activeClass="active"
                >
                  {link.title}
                </ScrollLink>
              </p>
            ))} 
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <a href="#PrivacyPolicy">Privacy Policy</a> 
            <a href="#TermOfuse">Term of use</a>    
          </div>
        </div>

        {/* Column 3 */}
        <div className='flex flex-col gap-2 xs:items-center sm:items-center md:items-center'>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: support@servicehub.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-16">
        <p> Copyright &copy; 2024 ServiceHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;