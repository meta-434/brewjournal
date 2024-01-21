import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if ( typeof error === 'string') {
        errorMessage = error;
    } else {
        console.error('Unknown error type', error);
        errorMessage = 'Unknown error';
    }

    console.error(error);

    return (
    <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
        <i>{errorMessage}</i>
        </p>
    </div>
    );
}

export default ErrorPage;