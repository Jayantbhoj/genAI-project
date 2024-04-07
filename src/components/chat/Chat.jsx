import React, { useContext } from 'react';
import { assets } from '../../assets/assets'
import './Chat.css'
import { context } from '../../context/Context';

const Chat = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(context)

  // Function to handle when a card is clicked
  const handleCardClick = (prompt) => {
    // Set the selected prompt as the input
    setInput(prompt);
    // Send the prompt for processing
    onSent(prompt);
  };

  return (
    <div className='chat'>
      <div className='nav'>
        <p>Gen AI</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className='chat-container'>
        {/**ternary operator to check if showresult is false then show cards otherwise display response   */}
        {!showResult ? <>
          <div className='greet'>
            <p><span>Hello, there!</span> </p>
            <p>How can I help you?</p>
          </div>

          <div className='cards'>
            <div className='card' onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
              <p>Suggest beautiful places to see on an upcoming road trip</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className='card' onClick={() => handleCardClick("Summarize this concept: Options Trading")}>
              <p>Summarize this concept: Options Trading</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className='card' onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
              <p>Brainstorm team bonding activities for our work retreat</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className='card' onClick={() => handleCardClick("Improve the readability of the following code")}>
              <p>Improve the readability of the following code</p>
              <img src={assets.code_icon} alt="" />
            </div>

          </div>

        </> :

          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ?
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div> :
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}

            </div>
          </div>

        }



        <div className='chat-bottom'>
          <div className='searchbox'>
            <input
              // Event handler that fires whenever the input value changes
              onChange={(e) => setInput(e.target.value)}
              // Sets the value of the input field to the value stored in the 'input' state variable
              value={input}
              type="text"
              placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>

          <div >
            <p className='bottomDisclaimer'>
              Gen AI may display inaccurate info, including about people, so double check its responses. This is a clone made for a personal project.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Chat
