import React from 'react';

class CreatePayment extends React.Component {
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
            body: JSON.stringify({
              "cardPaymentMethodSpecificInput": {
                "authorizationMode": "FINAL_AUTHORIZATION",
                "initialSchemeTransactionId": "EFT.0000000001",
                "recurring": {
                  "recurringPaymentSequenceIndicator": "Yearly"
                },
                "token": "0ca037cc-9079-4df7-8f6f-f2a3443ee521",
                "tokenize": true,
                "transactionChannel": "ECOMMERCE",
                "unscheduledCardOnFileRequestor": "merchantInitiated",
                "unscheduledCardOnFileSequenceIndicator": "first",
                "paymentProductId": 840,
                "threeDSecure": {
                  "challengeCanvasSize": "string",
                  "challengeIndicator": "string",
                  "priorThreeDSecureData": {
                    "acsTransactionId": "string",
                    "method": "string",
                    "utcTimestamp": "string"
                  },
                  "skipAuthentication": false,
                  "exemptionRequest": "none",
                  "merchantFraudRate": 99,
                  "secureCorporatePayment": true,
                  "skipSoftDecline": true
                },
                "paymentProduct5100SpecificInput": {
                  "brand": "Forconex SA"
                },
                "paymentProduct130SpecificInput": {
                  "threeDSecure": {
                    "usecase": "fixed-amount-term-subscription",
                    "numberOfItems": 99,
                    "acquirerExemption": true,
                    "merchantScore": "Method 023 : A+"
                  }
                },
                "allowDynamicLinking": true
              },
              "hostedCheckoutSpecificInput": {
                "isRecurring": true,
                "locale": "string",
                "paymentProductFilters": {
                  "exclude": {
                    "groups": [
                      "string"
                    ],
                    "products": [
                      99999
                    ]
                  },
                  "restrictTo": {
                    "groups": [
                      "string"
                    ],
                    "products": [
                      99999
                    ]
                  }
                },
                "returnUrl": "http://dev.efficient-trading.com",
                "showResultPage": true,
                "tokens": "0ca037cc-9079-4df7-8f6f-f2a3443ee521,bece04aa-5131-4b96-adb9-c0b2d62bb38a,ae8b1b5c-fdb7-40ed-b483-432017a85cc9",
                "variant": "my-custom-template.html",
                "cardPaymentMethodSpecificInput": {
                  "groupCards": true
                },
                "sessionTimeout": 1
              },
              "redirectPaymentMethodSpecificInput": {
                "requiresApproval": true,
                "token": "0ca037cc-9079-4df7-8f6f-f2a3443ee521",
                "tokenize": false,
                "paymentProductId": 840,
                "paymentProduct809SpecificInput": {
                  "issuerId": "RABONL2U"
                },
                "paymentProduct840SpecificInput": {
                  "addressSelectionAtPayPal": true
                },
                "redirectionData": {
                  "returnUrl": "string"
                },
                "paymentOption": "string"
              },
              "mobilePaymentMethodSpecificInput": {
                "paymentProductId": 840,
                "authorizationMode": "FINAL_AUTHORIZATION"
              },
              
              "fraudFields": {
                "blackListData": "string",
                "customerIpAddress": "string",
                "productCategories": [
                  "string"
                ]
              },
              "order": {
                "additionalInput": {
                  "airlineData": {
                    "agentNumericCode": "string",
                    "code": "str",
                    "flightDate": "string",
                    "flightIndicator": "one-way",
                    "flightLegs": [
                      {
                        "airlineClass": "string",
                        "arrivalAirport": "strin",
                        "arrivalTime": "strin",
                        "carrierCode": "stri",
                        "conjunctionTicket": "string",
                        "couponNumber": "s",
                        "date": "string",
                        "departureTime": "string",
                        "endorsementOrRestriction": "string",
                        "exchangeTicket": "string",
                        "fare": "string",
                        "legFare": 0,
                        "fareBasis": "string",
                        "fee": 0,
                        "flightNumber": "stri",
                        "number": 99999,
                        "originAirport": "strin",
                        "passengerClass": "st",
                        "stopoverCode": "permitted",
                        "taxes": 0
                      }
                    ],
                    "invoiceNumber": "string",
                    "isETicket": true,
                    "isRestrictedTicket": true,
                    "isThirdParty": true,
                    "issueDate": "string",
                    "merchantCustomerId": "string",
                    "name": "string",
                    "passengerName": "string",
                    "passengers": [
                      {
                        "airlineLoyaltyStatus": "none",
                        "firstName": "string",
                        "surname": "string",
                        "surnamePrefix": "string",
                        "title": "string",
                        "passengerType": "adult"
                      }
                    ],
                    "placeOfIssue": "string",
                    "pnr": "string",
                    "pointOfSale": "string",
                    "posCityCode": "string",
                    "ticketCurrency": "EUR",
                    "ticketDeliveryMethod": "e-ticket",
                    "ticketNumber": "string",
                    "totalFare": 0,
                    "totalFee": 0,
                    "totalTaxes": 0,
                    "travelAgencyName": "string"
                  },
                  "loanRecipient": {
                    "accountNumber": "string",
                    "dateOfBirth": "string",
                    "partialPan": "string",
                    "surname": "string",
                    "zip": "string"
                  },
                  "lodgingData": {
                    "checkInDate": "string"
                  },
                  "typeInformation": {
                    "purchaseType": "string",
                    "transactionType": "string"
                  }
                },
                "amountOfMoney": {
                  "amount": 1000,
                  "currencyCode": "EUR"
                },
                "customer": {
                  "companyInformation": {
                    "name": "Customer Company Name"
                  },
                  "merchantCustomerId": "string",
                  "account": {
                    "authentication": {
                      "method": "string",
                      "utcTimestamp": "string"
                    },
                    "changeDate": "string",
                    "changedDuringCheckout": true,
                    "createDate": "string",
                    "hadSuspiciousActivity": true,
                    "passwordChangeDate": "string",
                    "passwordChangedDuringCheckout": true,
                    "paymentAccountOnFile": {
                      "createDate": "string",
                      "numberOfCardOnFileCreationAttemptsLast24Hours": 999
                    },
                    "paymentActivity": {
                      "numberOfPaymentAttemptsLast24Hours": 999,
                      "numberOfPaymentAttemptsLastYear": 999,
                      "numberOfPurchasesLast6Months": 9999
                    }
                  },
                  "accountType": "string",
                  "billingAddress": {
                    "additionalInfo": "floor 9",
                    "city": "Zaventem",
                    "countryCode": "BE",
                    "houseNumber": 3,
                    "state": "string",
                    "street": "Da Vinci street",
                    "zip": 1930
                  },
                  "contactDetails": {
                    "emailAddress": "string",
                    "faxNumber": "string",
                    "mobilePhoneNumber": "string",
                    "phoneNumber": "string",
                    "workPhoneNumber": "string"
                  },
                  "device": {
                    "acceptHeader": "string",
                    "browserData": {
                      "colorDepth": 99,
                      "javaEnabled": true,
                      "javaScriptEnabled": true,
                      "screenHeight": "string",
                      "screenWidth": "string"
                    },
                    "ipAddress": "string",
                    "locale": "string",
                    "timezoneOffsetUtcMinutes": "string",
                    "userAgent": "string"
                  },
                  "fiscalNumber": "string",
                  "locale": "string",
                  "personalInformation": {
                    "dateOfBirth": "string",
                    "gender": "string",
                    "name": {
                      "firstName": "string",
                      "surname": "string",
                      "title": "string"
                    }
                  }
                },
                "references": {
                  "descriptor": "string",
                  "merchantReference": "your-order-6372",
                  "merchantParameters": "SessionID=126548354&ShopperID=73541312"
                },
                "surchargeSpecificInput": {
                  "mode": "pass-through",
                  "surchargeAmount": {
                    "amount": 1000,
                    "currencyCode": "EUR"
                  }
                }
              }
            })
        };
        fetch('https://payment.preprod.direct.worldline-solutions.com/v2/VegaTradersTEST/hostedcheckouts', requestOptions)
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

export { CreatePayment }; 