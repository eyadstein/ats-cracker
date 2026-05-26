// pages/_error.js
'use client'
import React from 'react';

class ErrorPage extends React.Component {
    static getInitialProps({ err, res }) {
        // Log the error on the server side for production
        if (err) {
            console.error('Error occurred: ', err);
        }

        // Optionally log errors to an external logging service
        // logErrorToService(err);

        return { statusCode: res ? res.statusCode : 404, err };
    }

    componentDidMount() {
        if (this.props.err) {
            // Log the error in the browser (useful for client-side errors)
            console.error('Error occurred: ', this.props.err);
        }
    }

    render() {
        return (
            <div>
                <h1>An error occurred</h1>
                <p>Status Code: {this.props.statusCode}</p>
                <p>{this.props.err ? this.props.err.message : 'Unknown error'}</p>
            </div>
        );
    }
}

export default ErrorPage;
