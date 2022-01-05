import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const NewsletterModal = ({ isOpen, onDismiss, setHasSubscribed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [didSubscribe, setDidSubscribe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const {
      elements: {
        email: { value: email },
      },
    } = event.target;
    await addToMailchimp(email);
    setDidSubscribe(true);
    window.localStorage.setItem('SUBSCRIBED', true);
    setHasSubscribed(true);
  };

  return (
    <DialogOverlay
      dangerouslyBypassScrollLock={true}
      isOpen={isOpen}
      onDismiss={onDismiss}
      className="fixed left-1/2 bottom-0 w-full max-w-screen-sm transform -translate-x-1/2 md:bottom-4"
    >
      <DialogContent className="bg-white py-8 px-8 border-8 border-secondary mx-auto outline-none shadow-md">
        <h1 className="text-lg font-display mb-4">Sign up to the micromobility news U.K. newsletter</h1>
        <p className="text-sm mb-8">Micromobility news and views including our podcasts, blog and events</p>

        <button
          aria-label="Close"
          onClick={onDismiss}
          className="absolute -top-2 -right-2 w-14 h-14 bg-secondary text-white rounded-full"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="flex items-center">
          {!didSubscribe && (
            <input
              className="w-full text-sm bg-black bg-opacity-10 py-4 px-4 rounded-md mr-4"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          )}

          {!didSubscribe && (
            <button
              type="submit"
              className="block text-sm w-full max-w-max px-8 py-4 bg-primary text-white rounded-full mx-auto disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Subscribe
            </button>
          )}
          {didSubscribe && (
            <button
              type="button"
              onClick={onDismiss}
              className="block text-sm max-w-max text-center text-primary bg-transparent mx-auto"
            >
              You're all set!
            </button>
          )}
        </form>
      </DialogContent>
    </DialogOverlay>
  );
};

export default NewsletterModal;
