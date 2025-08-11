import React from 'react'
import Slides from './Slides'
import Category from './Specialization';
import Section1 from './Section1';
import Footer from './Footer';
import CustomerNavbar from './CustomerNavbar';

function Home() {
  return (
    <div>
      <CustomerNavbar/>
      <Slides/>
      <Category/>
      <Section1/>
      <Footer/>
    </div>
  )
}

export default Home;