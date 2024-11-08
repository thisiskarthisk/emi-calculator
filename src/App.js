import React, { useState } from 'react';
import './App.css';

const LoanEMICalculator = () => {
    const [amount, setAmount] = useState(''); // Default amount
    const [rate, setRate] = useState('');     // Default interest rate
    const [month, setMonth] = useState('');   // Default time in months
    const [emi, setEMI] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);


    const calculateEMI = () => {
        // Input validation: Check for empty fields
        if (!amount || !rate || !month) {
            setEMI(0);
            setTotalInterest(0);
            setTotalPayment(0);
            return;
        }

        const loanAmount = parseFloat(amount);
        const monthlyRate = parseFloat(rate) / 12 / 100;
        const totalMonths = parseInt(month);

        console.log("Loan Amount" , loanAmount);
        console.log("Monthly Rate" , monthlyRate);
        console.log("Payment Months" , totalMonths);

        // Calculate EMI, total interest, and total payment
        const emiResult = 
        ((
          loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1
        )).toFixed(2);

        console.log("Emi Result", emiResult);

        const totalPaymentAmount = (emiResult * totalMonths).toFixed(2);
        const totalInterestAmount = (totalPaymentAmount - loanAmount).toFixed(2);

        console.log("Total Payment Amount", totalPaymentAmount );
        console.log("Total Interest Amount", totalInterestAmount );

        setEMI(parseFloat(emiResult));
        setTotalPayment(parseFloat(totalPaymentAmount));
        setTotalInterest(parseFloat(totalInterestAmount));
    };



    const resetForm = () => {
        setAmount('');
        setRate('');
        setMonth('');
        setEMI(0);
        setTotalInterest(0);
        setTotalPayment(0);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Loan EMI Calculator</h1>
                <div className="reset-icon-container reset-icon">
                    <i
                        className="reset-icon"
                        onClick={resetForm}
                        title="Reset Form"
                    >
                      &#x21bb;
                    </i>
                </div>
            </div>

            {/* Amount Input and Slider */}
            <div className="input-group">
                <label>Loan Amount ($)</label>
                <input
                    type="number"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    // placeholder="Enter amount"
                    placeholder="0.00"
                />
                <input
                    type="range"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={amount || ''}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            {/* Rate Input and Slider */}
            <div className="input-group">
                <label>Interest Rate (%)</label>
                <input
                    type="number"
                    min="1"
                    max="25"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    // placeholder="Enter rate"
                    placeholder="0 %"
                />
                <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.1"
                    value={rate || ''}
                    onChange={(e) => setRate(e.target.value)}
                />
            </div>

            {/* Time Input and Slider */}
            <div className="input-group">
                <label>Loan Duration (Months)</label>
                <input
                    type="number"
                    min="1"
                    max="360"
                    step="1"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    // placeholder="Enter time"
                    placeholder="0"
                />
                <input
                    type="range"
                    min="1"
                    max="360"
                    step="1"
                    value={month || ''}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </div>

            {/* Buttons for Calculate */}
            <div className="button-group">
                <button onClick={calculateEMI}>
                    Calculate
                </button>
            </div>
            <br />

            {/* EMI Breakdown Display */}
            <div className="results">
                <table>
                    <thead>
                        <tr>
                            <th>Monthly EMI</th>
                            <th>Principal Amount</th>
                            <th>Total Interest</th>
                            <th>Total Amount Payable</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>${emi.toLocaleString()}</td>
                            <td>${amount ? parseFloat(amount).toLocaleString() : '0'}</td>
                            <td>${totalInterest.toLocaleString()}</td>
                            <td>${totalPayment.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default LoanEMICalculator;
