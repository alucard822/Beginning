import { KeyboardEvent } from 'react';

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<HTMLInputElement>;
  }
}