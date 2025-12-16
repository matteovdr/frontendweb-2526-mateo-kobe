// src/components/Error.jsx
import { isAxiosError } from 'axios';

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <div className='rounded-lg p-4 mb-4 border bg-red-50 border-red-200 text-red-700 
      dark:bg-red-900/30 dark:border-red-700 dark:text-red-100' data-cy='axios_error_message'>
        <h4 className='font-semibold text-lg mb-2 text-red-800 dark:text-red-100'>Oei,er gaat iets fout!</h4>
        <p>
          {error?.response?.data?.message || error.message}
          {error?.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className='rounded-lg p-4 mb-4 border bg-red-50 border-red-200 text-red-700 
      dark:bg-red-900/30 dark:border-red-700 dark:text-red-100'>
        <h4 className='font-semibold text-lg mb-2 text-red-800 
        dark:text-red-100'>Er is een onverwachte fout opgetreden.</h4>
        <p>{error.message || JSON.stringify(error)}</p>
      </div >
    );
  }

  return null;
}
