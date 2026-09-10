import { type ReactElement, useEffect, useRef } from 'react';
import 'modern-normalize';
import '@/App.styl';
import 'non.geist';
import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import { Footer } from '@/components/banners/Footer.tsx';
import { Header } from '@/components/banners/Header.tsx';
import { ConfirmationProvider } from '@/components/modals/ConfirmationProvider.tsx';
import { Editor } from '@/features/Editor.tsx';
import { Preview } from '@/features/Preview.tsx';

const TOOLTIP_TARGETS = '#editor button[title], header button[title], footer a[title]';

export const App = (): ReactElement => {
  const printRef = useRef<HTMLElement | null>(null);
  const showDelay = 500; // ms
  const hideDelay = 150; // ms

  useEffect(() => {
    const tooltips = delegate(document.body, {
      arrow: false,
      content: (reference) => reference.getAttribute('title') ?? '',
      delay: [showDelay, hideDelay], // [show, hide]
      onShow: (instance) => {
        instance.setContent(instance.reference.getAttribute('title') ?? '');
      },
      placement: 'right',
      target: TOOLTIP_TARGETS,
      theme: 'slate',
      touch: ['hold', hideDelay],
    });

    return (): void => {
      tooltips.destroy();
    };
  }, []);

  return (
    <ConfirmationProvider>
      <Header />
      <div id='primary'>
        <Editor printRef={printRef} />
        <Preview printRef={printRef} />
      </div>
      <Footer />
    </ConfirmationProvider>
  );
};
