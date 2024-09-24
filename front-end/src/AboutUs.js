import { useState, useEffect } from 'react'
import axios from 'axios'
import './Messages.css'
import loadingIcon from './loading.gif'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [messages, setMessages] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches about-us from the back-end server.
   */
  const fetchAboutUs = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about-us`)
      .then(response => {
        // axios bundles up all response data in response.data property
        // console.log(response.data)
        const messages = response.data.message
        setMessages(messages)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  console.log(messages)


  // set up loading data from server when the component first loads
  useEffect(() => {
    fetchAboutUs()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>

      {error && <p className="MessageForm-error">{error}</p>}

        <p>{messages ? messages['about me'] : null}</p>

      {error && <p className="Messages-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {messages ? <img alt='portrait' src={messages.image} /> : null}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs;
