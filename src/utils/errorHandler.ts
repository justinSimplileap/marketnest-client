// utils/errorResponse.ts
export const handleErrorResponse = (error: any) => {
  let errorMessage = 'An error occurred';

  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        errorMessage = data.message || 'Bad request';
        break;
      case 401:
        errorMessage = 'Unauthorized access, please log in';
        break;
      case 500:
        errorMessage = 'Internal server error, please try again later';
        break;
      default:
        errorMessage = data.message || errorMessage;
    }
  } else if (error.request) {
    errorMessage = 'Network error, please check your connection';
  } else {
    errorMessage = error.message || errorMessage;
  }

  return errorMessage;
};
