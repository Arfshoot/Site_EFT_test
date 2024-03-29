import React from 'react';

class CheckConnection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null,
            errorMessage: null
        };
    }

    componentDidMount() {
        // POST request using fetch with error handling
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Check connection' })
        };
        fetch('https://payment.preprod.direct.worldline-solutions.com/v2/VegaTradersPROD/services/testconnection', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                this.setState({ postId: data.id })
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            });
    }

    render() {
        const { errorMessage } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">POST Request with Error Handling</h5>
                <div className="card-body">
                    Error: {errorMessage}
                </div>
            </div>
        );
    }
}

export { CheckConnection }; 