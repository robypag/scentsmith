import { startDocumentProcessorWorker, stopDocumentProcessorWorker } from './document-processor';

let workersStarted = false;

export function startAllWorkers() {
  if (workersStarted) {
    console.log('Workers already started');
    return;
  }

  console.log('Starting background workers...');
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    ENABLE_WORKERS: process.env.ENABLE_WORKERS,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
  });
  
  try {
    const worker = startDocumentProcessorWorker();
    console.log('Document processor worker started:', !!worker);
    
    workersStarted = true;
    console.log('All workers started successfully');
  } catch (error) {
    console.error('Error starting workers:', error);
  }
}

export function stopAllWorkers() {
  if (!workersStarted) {
    console.log('Workers not started');
    return;
  }

  console.log('Stopping background workers...');
  
  stopDocumentProcessorWorker();
  
  workersStarted = false;
  console.log('All workers stopped');
}

// Auto-start workers in production
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_WORKERS === 'true') {
  startAllWorkers();
}