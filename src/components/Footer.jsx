import { Link } from 'gatsby';
import React from 'react';
import { useFooter } from '../hooks/useFooter';
import Bike from '../assets/images/Bike.svg';
import Scooter from '../assets/images/Scooter.svg';
import NewsletterModal from './NewsletterModal';
import { useState } from 'react';

const Footer = () => {
  const { links } = useFooter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(() => {
    if (typeof window === 'undefined') return false;

    return Boolean(window.localStorage.getItem('SUBSCRIBED'));
  });

  return (
    <>
      <footer className="container text-xl font-display flex flex-col flex-nowrap justify-between py-16 lg:flex-row lg:justify-center lg:items-end lg:py-32">
        <nav className="flex flex-col flex-nowrap mb-24 px-12 lg:px-0 lg:mr-96">
          {links.map((link) =>
            link.page ? (
              <Link to={`/${link.page.slug}`}>{link.text}</Link>
            ) : (
              <a href={link.externalUrl} target="_blank" rel="noopener noreferrer">
                {link.text}
              </a>
            ),
          )}

          <button className="text-left" onClick={() => setIsModalOpen(true)}>
            Subscribe to the newsletter
          </button>
        </nav>

        <div className="flex flex-row flex-nowrap justify-end px-12 lg:px-0">
          <Bike className="w-48 h-w-48 mr-8 -mt-8 lg:w-72 lg:h-w-72 lg:mr-24" />
          <Scooter className="w-40 h-w-40 lg:w-56 lg:h-56" />
        </div>
      </footer>

      {!hasSubscribed && (
        <NewsletterModal
          isOpen={isModalOpen}
          onDismiss={() => setIsModalOpen(false)}
          onSubscribe={() => setHasSubscribed(true)}
        />
      )}
    </>
  );
};

export default Footer;
