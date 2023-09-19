import React from 'react'
import './faq.css';
import Faq1 from './Faq1';
import Faq2 from './Faq2';


const Faq = () => {

  return (
    <div>
      <section className="faqs-container py-1">
        <div className="faqs">
          <h1 className="bigHeading pt-2 pl-12 pb-10 font-semibold xl:text-5xl lg:text-4xl md:text-4xl text-3xl text-white lg:leading-[2.5rem] 2xl:leading-[3.7rem]">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4361EE] to-[#4CC9F0]">
              {" "}
              FAQs{" "}
            </span>
          </h1>

          <div className="accordion">
            <div className='flex lg:flex-row flex-col'>
              <div className='lg:p-10 lg:w-1/2 w-full'>
                <Faq1 />
              </div>
              <div className='lg:p-10 lg:w-1/2 w-full'>
                <Faq2 />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Faq