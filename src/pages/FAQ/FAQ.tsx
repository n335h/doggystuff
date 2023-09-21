import './FAQ.css';
import { useState } from 'react';
import faqdog from '../../Assets/faqdog.svg';
import question from '../../Assets/question.svg';
import { Link } from 'react-router-dom';


const FAQ2 = () => {
    const [activeIndex, setActiveIndex] = useState<number[]>([]);

    const toggleContent = (index : number) => {
      if (activeIndex.includes(index)) {
        // If the clicked item is already open, close it.
        setActiveIndex(activeIndex.filter((item) => item !== index));
      } else {
        // If the clicked item is closed, open it.
        setActiveIndex([...activeIndex, index]);
      }
    };
  const faqData = [
    {
      question:'How much does each subscription cost?',
      answer:'It depends! The size of your dog plus a few other question we have for them will affect the cost. Overall, the subscription offers you the best value on these nutrients.',
    },
    {
      question: 'Where do you deliver to?',
      answer: 'We deliver to England, Scotland, and Wales (excluding the Scottish Highlands and Islands). We’re looking into expanding our delivery areas in the coming months.',
    },
    {
      question: 'When does the food arrive?',
      answer: 'Pick any weekday and it will arrive every four weeks.',
    },
    {
      question: 'Shipping',
      answer:'Shipping is included in the price. You’ll get a text/email from our delivery driver to let you know a two-hour window in which to expect the delivery.',
    },
    {
        question: 'How should i transition my dog onto DoggyStuff?',
        answer:'We’ll help you through it, with a transition guide to walk you through the process clearly and if at any point you have any issues you can always reach out to us at .',
      },
  ];
  return (
    <section className="pages" id="faq">
      <div className="faq-container">
        <div className="faq">
            
          <div className="faq-content">
          <h3 className="faqtitle animate-pop-in">FAQS & HELP</h3>
            <h1 className="pagetitle animate-pop-in">So Help, Much Informative</h1>
            <p className="pagesubtitle animate-pop-in">We guess you have some questions. We're guessing your doggo may too. Good news, we have answers for both.</p>
            <img className="faqfloat animate-pop-in" src={question} alt="FAQ" />
            <ul id="list">
              {faqData.map((faq, index) => (
                <div
                  className={`faq-subject animate-pop-in ${activeIndex.includes(index) ? 'open' : ''}`}
                  key={index}
                >
                  <li
                    className={`title ${activeIndex.includes(index) ? 'active' : ''}`}
                    onClick={() => toggleContent(index)}
                  >
                    {faq.question}{' '}
                    <img
                      id="caron"
                      className={`caron ${activeIndex.includes(index) ? 'active' : ''}`}
                      src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png"
                      alt="caron"
                    />
                  </li>
                  <li className={`content ${activeIndex.includes(index) ? 'open' : ''}`}>
                    {faq.answer}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="faqbottom">
          <img className="faqbottomimg" src={faqdog} alt="FAQ" />
          <h1 className="faqbottomtitle animate-pop-in">Ready to stop chasing your tail in circles looking for the best, human-grade quality dog food?</h1>          
           
          <Link to="/GetStarted" className="faqbottombutton animate-pop-in">Try DoggyStuff</Link>
      </div>
        </div>
      

    </section>
  );
};

export default FAQ2;