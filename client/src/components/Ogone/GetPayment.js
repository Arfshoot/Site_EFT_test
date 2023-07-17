import React from 'react';

class GetPayment extends React.Component {
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
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "hostedCheckoutSpecificOutput": {
                  "hostedCheckoutId": 3066019730,
                  "variant": "my-custom-template.html"
                },
                "paymentOutput": {
                  "amountOfMoney": {
                    "amount": 1000,
                    "currencyCode": "EUR"
                  },
                  "merchantParameters": "SessionID=126548354&ShopperID=73541312",
                  "references": {
                    "merchantReference": "your-order-6372",
                    "merchantParameters": "SessionID=126548354&ShopperID=73541312"
                  },
                  "amountPaid": 0,
                  "acquiredAmount": {
                    "amount": 1000,
                    "currencyCode": "EUR"
                  },
                  "customer": {
                    "device": {
                      "ipAddressCountryCode": "FR"
                    }
                  },
                  "cardPaymentMethodSpecificOutput": {
                    "paymentProductId": 840,
                    "authorisationCode": "string",
                    "card": {
                      "cardNumber": "string",
                      "expiryDate": 529,
                      "bin": "string",
                      "countryCode": "FR"
                    },
                    "fraudResults": {
                      "fraudServiceResult": "string",
                      "avsResult": "string",
                      "cvvResult": "string"
                    },
                    "initialSchemeTransactionId": "string",
                    "schemeReferenceData": "string",
                    "threeDSecureResults": {
                      "version": "2.2.0",
                      "flow": "frictionless",
                      "cavv": "string",
                      "eci": "string",
                      "schemeEci": 5,
                      "authenticationStatus": "Y",
                      "acsTransactionId": "3E1D57DF-8DB1-4614-91D5-B11962519703",
                      "dsTransactionId": "3E1D57DF-8DB1-4614-91D5-B11962519703",
                      "xid": "string",
                      "challengeIndicator": "no-preference",
                      "liability": "issuer",
                      "appliedExemption": "low-value",
                      "exemptionEngineFlow": "not-applicable-challenge-indicator-received"
                    },
                    "token": "0ca037cc-9079-4df7-8f6f-f2a3443ee521",
                    "paymentOption": "string",
                    "externalTokenLinked": {
                      "GTSComputedToken": "string",
                      "ComputedToken": "string",
                      "GeneratedToken": "string"
                    },
                    "authenticatedAmount": 0
                  },
                  "mobilePaymentMethodSpecificOutput": {
                    "paymentProductId": 840,
                    "authorisationCode": "string",
                    "fraudResults": {
                      "fraudServiceResult": "string",
                      "avsResult": "string",
                      "cvvResult": "string"
                    },
                    "paymentData": {
                      "dpan": "string",
                      "expiryDate": 529
                    },
                    "threeDSecureResults": {
                      "version": "2.2.0",
                      "flow": "frictionless",
                      "cavv": "string",
                      "eci": "string",
                      "schemeEci": 5,
                      "authenticationStatus": "Y",
                      "acsTransactionId": "3E1D57DF-8DB1-4614-91D5-B11962519703",
                      "dsTransactionId": "3E1D57DF-8DB1-4614-91D5-B11962519703",
                      "xid": "string",
                      "challengeIndicator": "no-preference",
                      "liability": "issuer",
                      "appliedExemption": "low-value",
                      "exemptionEngineFlow": "not-applicable-challenge-indicator-received"
                    },
                    "network": "string"
                  },
                  "paymentMethod": "string",
                  "redirectPaymentMethodSpecificOutput": {
                    "paymentProductId": 840,
                    "fraudResults": {
                      "fraudServiceResult": "string"
                    },
                    "paymentProduct840SpecificOutput": {
                      "billingAddress": {
                        "additionalInfo": "floor 9",
                        "city": "Zaventem",
                        "countryCode": "BE",
                        "houseNumber": 3,
                        "state": "string",
                        "street": "Da Vinci street",
                        "zip": 1930
                      },
                      "customerAccount": {
                        "accountId": "customer-account@email.com",
                        "companyName": "Customer Company Name",
                        "countryCode": "BE",
                        "customerAccountStatus": "verified",
                        "customerAddressStatus": "confirmed",
                        "firstName": "John",
                        "payerId": "RRCYJUTFJGZTA",
                        "surname": "Doe"
                      },
                      "customerAddress": {
                        "additionalInfo": "floor 9",
                        "city": "Zaventem",
                        "countryCode": "BE",
                        "houseNumber": 3,
                        "state": "string",
                        "street": "Da Vinci street",
                        "zip": 1930
                      },
                      "protectionEligibility": {
                        "eligibility": "Eligible",
                        "type": "ItemNotReceivedEligible"
                      }
                    },
                    "paymentProduct5001SpecificOutput": {
                      "authorisationCode": "string"
                    },
                    "paymentProduct5500SpecificOutput": {
                      "paymentReference": "string",
                      "paymentStartDate": "string",
                      "paymentEndDate": "string"
                    },
                    "paymentProduct5402SpecificOutput": {
                      "brand": "string"
                    },
                    "paymentOption": "string",
                    "token": "0ca037cc-9079-4df7-8f6f-f2a3443ee521"
                  },
                  "sepaDirectDebitPaymentMethodSpecificOutput": {
                    "paymentProductId": 840,
                    "fraudResults": {
                      "fraudServiceResult": "string"
                    },
                    "paymentProduct771SpecificOutput": {
                      "mandateReference": "string"
                    }
                  },
                  "surchargeSpecificOutput": {
                    "mode": "pass-through",
                    "surchargeAmount": {
                      "amount": 1000,
                      "currencyCode": "EUR"
                    }
                  }
                },
                "status": "CREATED",
                "statusOutput": {
                  "errors": [
                    {
                      "errorCode": 50001130,
                      "category": "PAYMENT_PLATFORM_ERROR",
                      "code": 50001130,
                      "httpStatusCode": 404,
                      "id": "UNKNOWN_PAYMENT_ID",
                      "message": "Authorisation declined",
                      "propertyName": "paymentId",
                      "retriable": true
                    }
                  ],
                  "isCancellable": true,
                  "statusCategory": "CREATED",
                  "statusCode": 0,
                  "statusCodeChangeDateTime": "string",
                  "isAuthorized": true,
                  "isRefundable": true
                },
                "id": 30660197300
              })
        };
        fetch('https://payment.preprod.direct.worldline-solutions.com/v2/VegaTradersPROD/payments/{paymentId}', requestOptions)
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

export { GetPayment }; 