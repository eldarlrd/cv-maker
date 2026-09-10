import { type ReactElement, useRef } from 'react';
import 'modern-normalize';
import '@/App.styl';
import 'non.geist';

import { useTooltip } from '!/useTooltip.ts';
import { Footer } from '@/components/banners/Footer.tsx';
import { Header } from '@/components/banners/Header.tsx';
import { ConfirmationProvider } from '@/components/modals/ConfirmationProvider.tsx';
import { Editor } from '@/features/Editor.tsx';
import { Preview } from '@/features/Preview.tsx';

export const App = (): ReactElement => {
  const printRef = useRef<HTMLElement | null>(null);
  useTooltip();

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
