import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {

  const [name,setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [scale, setScale] = useState('')
  const [country, setCountry] = useState('')
  const [stateOrCity, setStateOrCity] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    //await signup(email, password)
    await signup(name, industry, registrationNumber, scale, country, 
      stateOrCity, timeZone, phoneNo, email, password, confirmPassword)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Company Name</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />

      <label>Industry</label>
      <input 
        type="text" 
        onChange={(e) => setIndustry(e.target.value)} 
        value={industry} 
      />

      <label>Business Registration Number </label>
      <input 
        type="number" 
        onChange={(e) => setRegistrationNumber(e.target.value)} 
        value={registrationNumber} 
      />

      <label>Organization Scale</label>
      <input 
        type="text" 
        onChange={(e) => setScale(e.target.value)} 
        value={scale} 
      />

      <label>Country</label>
      <input 
        type="text" 
        onChange={(e) => setCountry(e.target.value)} 
        value={country} 
      />
      
      <label>State/City </label>
      <input 
        type="text" 
        onChange={(e) => setStateOrCity(e.target.value)} 
        value={stateOrCity} 
      />

      <label>Time Zone </label>
      <input 
        type="text" 
        onChange={(e) => setTimeZone(e.target.value)} 
        value={timeZone} 
      />

      <label>Phone Number </label>
      <input 
        type="text" 
        onChange={(e) => setPhoneNo(e.target.value)} 
        value={phoneNo} 
      />

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Password</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <label>Confirm Password</label>
      <input 
        type="password" 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        value={confirmPassword} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup