export const logError = (error: any, message?: string) => {
  // In a real app, you might send this to a logging service
  console.error(message, error);
};
