import './FAQ.css';
import { useState } from 'react';

const FAQ2 = () => {
    const [activeIndex, setActiveIndex] = useState([]);

    const toggleContent = (index) => {
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
      question: 'How much does each subscription cost?',
      answer:
        'It depends! The size of your cat plus how you choose to divvy up wet and dry food will affect the cost. Overall, the subscription offers you the best value on these nutrients.',
    },
    {
      question: 'Where do you deliver to?',
      answer:
        'We deliver to England, Scotland, and Wales (excluding the Scottish Highlands and Islands). We’re looking into expanding our delivery areas in the coming months.',
    },
    {
      question: 'When does the food arrive?',
      answer: 'Pick any weekday and it will arrive every four weeks.',
    },
    {
      question: 'Shipping',
      answer:
        'Shipping is included in the price. You’ll get a text/email from our delivery driver to let you know a two-hour window in which to expect the delivery.',
    },
  ];
  return (
    <section className="pages" id="faq">
      <div className="faq-container">
        <div className="faq">
          <div className="faq-content">
            <h1 id="pagetitle">So Help, Much Informative</h1>
            <p id="pagesubtitle">We guess you have some questions. We're guessing your doggo may too. Good news, we have answers for both.</p>
            <img className="faqimg" src="" alt="FAQ" />
            <ul id="list">
              {faqData.map((faq, index) => (
                <div
                  className={`faq-subject ${activeIndex.includes(index) ? 'open' : ''}`}
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
      </div>
    </section>
  );
};

export default FAQ2;