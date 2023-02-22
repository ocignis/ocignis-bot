export const isPaperTesting = () => process.env.NODE_ENV === 'development-paper-testing';

export const isSimulate = () => process.env.NODE_ENV === 'development-simulate';
