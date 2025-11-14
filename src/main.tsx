/**
 * @license AGPL-3.0-only
 * CV Maker - A Resume Builder
 * Copyright (C) 2024-2025 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of CV Maker.
 *
 * CV Maker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * CV Maker is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CV Maker. If not, see <https://www.gnu.org/licenses/>.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App.tsx';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

const registerSW = (): void => {
  if ('serviceWorker' in navigator)
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/cv-maker/sw.js', {
          scope: '/cv-maker/'
        })
        .catch((error: unknown) => {
          if (error instanceof Error) console.error(error);
        });
    });
};

registerSW();
