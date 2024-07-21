import { useState, useRef } from "react";

const Home = () => {
  const [amount, setAmount] = useState();
  const [term, setTerm] = useState();
  const [interestRate, setInterestRate] = useState();

  const [selectedOption, setSelectedOption] = useState("");
  const [totalAmount, setTotalAmount] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();
  const summarySection = useRef(null);

  const clearAll = ()=>{
    setAmount('');
    setInterestRate('');
    setTerm('');
    setSelectedOption('')
    setTotalAmount();
    setMonthlyPayment();
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (selectedOption === "repayment") {
      const interest = (interestRate / 100) * term * amount;
      const total = parseFloat(interest) + parseFloat(amount);
      const monthly = total / (12 * term);
      setTotalAmount(total.toFixed(2));
      setMonthlyPayment(monthly.toFixed(2));
    } else if (selectedOption === "interest") {
      const totalInterest = (interestRate / 100) * amount;
      const monthly = totalInterest / (12 * term);
      setTotalAmount(totalInterest.toFixed(2));
      setMonthlyPayment(monthly.toFixed(2));
    }
    
    else{
      console.log('select an option')
    }
    summarySection.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className="home">
      <form className="forms" onSubmit={handleCalculate}>
        <h1>Morgage Calculator</h1>
        <a onClick={clearAll}>Clear All</a>

        <div className="input-block">
          <label htmlFor="amount">Morgage Amount</label>
          <br />
          <div className="input">
            <div className="fixed">&pound;</div>
            <input type="number" className="amount-style" required value={amount} onChange={(e) => setAmount(e.target.value)}/>
          </div>

          <div className="term-interest">

          <div className="term-flexed">
          <label htmlFor="amount" className="smaller-label">Morgage Term</label>
          
          <div className="input">
            <input type="number" className="amount-style" required value={term} onChange={(e) => setTerm(e.target.value)}/>
            <div className="fixed">years</div>
          </div>
          </div>

          <div className="term-flexed">
          <label htmlFor="amount" className="smaller-label">Interest Rate</label>
          
          <div className="input">
            <input type="number" className="amount-style" required value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>
            <div className="fixed">%</div>
          </div>
          </div>

          </div>

          <label htmlFor="morgage">Mortgage Type</label>
          <br />
          <div
            className={`radio-div radio-input ${
              selectedOption === "repayment" ? "radio-input-checked" : ""
            }`}
          >
            <label className="small-space">
              <input
                className="small-space"
                type="radio"
                value="repayment"
                name="mortgage"
                checked={selectedOption === "repayment"}
                onChange={handleChange}
                // onClick={setSelectedOption('repayment')}
              />
              Repayment
            </label>
            <br />
          </div>

          <div
            className={`radio-div radio-input ${
              selectedOption === "interest" ? "radio-input-checked" : ""
            }`}
          >
            <label className="small-space">
              <input
                className="small-space"
                type="radio"
                value="interest"
                name="mortgage"
                checked={selectedOption === "interest"}
                onChange={handleChange}
                // onClick={setSelectedOption('interest')}
              />
              Interest only
            </label>
            <br />
          </div>

          <button className="calculate">Calculate Payment</button>
        </div>
      </form>

      <div className="summary" ref={summarySection}>
        <h2>Your results</h2><br />
        <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click calculate "repayments" again.</p>
        <div className="result">
          <p>Your monthly repayments</p>
          {!monthlyPayment && <h1>------</h1>}
          {monthlyPayment && <h1>&pound;{monthlyPayment}</h1>}
          <hr />
          <p>Total you'll repay over the term</p>
          {!totalAmount && <h2>------</h2>}
          {totalAmount && <h2>&pound;{totalAmount}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Home;
