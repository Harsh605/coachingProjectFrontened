import React from 'react'
import Img1 from "../../Images/Home/slider4.webp"
import Img2 from "../../Images/Home/slider4.webp"
import Faq from '../Home/Faq';

const LinkColor = "#494e56";
const ButtonColor = "#5b58ff";
const About = () => {
  return (
    <div
      id="about"
      className="sm:p-10 md:pt-20 md:px-24 sm:p-10  "
    >
      <section className="about-us container mx-auto">
        <h2
          className='"bigHeading pt-4 font-bold xl:text-5xl lg:text-4xl md:text-4xl text-3xl lg:leading-[2.5rem] 2xl:leading-[3.7rem]"'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
         <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0]" >
            {' '}
            Know About Us{' '}
          </span>
        </h2>
        <p
          className=" pt-8 pb-12"
          style={{ display: 'flex', justifyContent: 'center',color:LinkColor }}
        >
          Learn more about our Vision behind Instu talent hub and our Mission towards
          greatness.
        </p>

        <br />
        <div
          style={{ maxWidth: '1200px', margin: 'auto' }}
          className="flex flex-wrap"
        >
          <div className="lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
            <h2 className="smallHeading text-3xl text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0] pb-10 font-bold" >
              Our Vision
            </h2>
            <p className="text-lg font-bold pb-3 " style={{color:LinkColor}}>
            The instu talent hub is a education company that provides reward for any exams all over India.These exams conduct by government board as like school, college, competative exams.
            </p>
            <ul>
              {/* <li className=" pb-3" style={{color:LinkColor}}>
                <i className="fa-solid fa-check px-1 " style={{color:ButtonColor}} />
                Committed to revolutionizing the way students prepare, by leveraging proven teaching methodologies to create a platform that is student-centric, result-oriented, and scalable.
              </li>
              <li className=" pb-3" style={{color:LinkColor}}>
                <i className="fa-solid fa-check px-1" style={{color:ButtonColor}}/>
                Our goal is to become the go-to coaching platform for individuals seeking success in government exams, school exams, and college exams, providing them with the necessary guidance and resources for achieving their academic goals.
              </li> */}
            </ul>
            <br />
            {/* <a className="mt-16 px-12 py-3 bg-gradient-to-r from-[#F72585] to-[#7209B7] hover:from-[#7209B7] hover:to-[#F72585] text-xl text-white font-semibold drop-shadow-lg rounded-full"
            href="#">Read More</a>  */}
          </div>

          <div className="lg:w-1/2 pr-4 lg:pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
            {/* <VideoPlayer src={Vision} func={true}/> */}
            <img
              className="lg:w-4/5"
              src={Img1}
              style={{ width: '100%' }}
              alt="Vision Image"
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* <div
          style={{ maxWidth: '1200px', margin: 'auto' }}
          className="flex flex-wrap-reverse"
        >
          <div className="lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
            <img
              className="my-10 lg-pt-10"
              src={Img2}
              style={{ width: '100%' }}
              alt="Mission Image"
            />
          </div>

          <div className="lg:w-1/2 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-full pr-4 pl-4">
          <h2 className="smallHeading md:mt-9 text-3xl text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0] pb-10 font-bold" >
              Our Mission
            </h2>
            <p className=" text-lg font-bold pb-3" style={{color:LinkColor}}>
            Our mission is to empower individuals preparing for government exams, school, and college exams offline by providing comprehensive coaching that enables success and unlocks their full potential.
            </p>
            <ul>
              <li className=" pb-3" style={{color:LinkColor}}>
                <i className="fa-solid fa-check px-1" style={{color:ButtonColor}}></i> 
                We strive to build a strong community of learners and educators who share our vision of academic excellence.
              </li>
              <li className=" pb-3" style={{color:LinkColor}}>
                <i className="fa-solid fa-check px-1 " style={{color:ButtonColor}}></i>
                By fostering a culture of dedication and personalized guidance, we aim to create a coaching platform that continually evolves and caters to the diverse needs of our students.
              </li>
            </ul>
            <br />
            
          </div>
        </div> */}
       
      </section>
      {/* <Faq /> */}
    </div>
  )
}

export default About
