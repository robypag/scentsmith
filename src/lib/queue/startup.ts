import { startAllWorkers } from './workers';

// Auto-start workers when this module is imported
if (typeof window === 'undefined') { // Server-side only
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_WORKERS === 'true') {
    console.log('Starting background workers...');
    startAllWorkers();
  }
}

export { startAllWorkers };