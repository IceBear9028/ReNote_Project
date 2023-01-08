import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>404 Page Not Found.</p>
            <Link to = "/main">
                <p>
                    <i>Back to main page.</i>
                </p>
            </Link>

        </div>
    );
}

export {ErrorPage}