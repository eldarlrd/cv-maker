import { useEffect } from 'react';
import { delegate } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const TOOLTIP_TARGETS = '#editor button[title], header button[title], footer a[title]';
const SHOW_DELAY = 500;
const HIDE_DELAY = 150;

export const useTooltip = (): void => {
  useEffect(() => {
    const tooltips = delegate(document.body, {
      arrow: false,
      content: (reference) => reference.getAttribute('title') ?? '',
      delay: [SHOW_DELAY, HIDE_DELAY],
      onTrigger: (instance) => {
        // removes native title popup
        const title = instance.reference.getAttribute('title');

        if (title !== null) {
          instance.setContent(title);
          instance.reference.removeAttribute('title');
        }
      },
      placement: 'right',
      target: TOOLTIP_TARGETS,
      theme: 'slate',
      touch: ['hold', HIDE_DELAY], // touch delay
    });

    return (): void => {
      tooltips.destroy();
    };
  }, []);
};
