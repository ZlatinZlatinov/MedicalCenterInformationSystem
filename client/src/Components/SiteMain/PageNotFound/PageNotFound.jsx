
import { Link } from 'react-router';
import { TriangleAlert } from 'lucide-react';

function PageNotFound() {
    return (
        <section id="page-not-found">
            <div className="page-not-found-panel">
                <TriangleAlert className="page-not-found-icon" aria-hidden="true" />
                <h1>404</h1>
                <p className="page-not-found-message">This is not the page you are looking for!</p>
                <p className="page-not-found-supporting-text">
                    The page may have moved, or the address you entered may be incorrect.
                </p>
                <Link to="/" className="btn blue-btn">Back to home</Link>
            </div>
        </section>
    );
} 

export default PageNotFound;