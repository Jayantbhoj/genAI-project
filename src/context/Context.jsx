import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const context=createContext();

const ContextProvider=(props)=>{
    const [input,setInput]=useState("")//used to save input data
    const [recentPrompt,setRecentPrompt]=useState("")// when we click on send button input field data will be saved here and displayed in chat component
    const [prevPrompts,setPrevPrompts]=useState([])//used to store all input history and display in recent tab
    const [showResult,setShowResult]=useState(false)// once this is true it'll hide greet text and boxes and display result
    const [loading,setLoading]=useState(false)// if true it'll display loading animation and after getting data we'll make it false
    const [resultData,setResultData]=useState("")//used to display result in the chat component 


    const delayPara=(index,nextWord )=>{
        setTimeout(function(){
            setResultData((prev)=> prev+ nextWord);
        },60*index)

    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)

    }

    const onSent=async(prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt!==undefined){
            response = await runChat(prompt)
            setRecentPrompt(prompt)
        }else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await runChat(input)
        }
       
        //for bold words
        let responseArray=response.split("**")
        let newResponse="";
        for( let i=0;i<responseArray.length;i++){
            if (i===0||i%2!==1){
                newResponse+=responseArray[i]
            }else{
                newResponse+="<b>"+responseArray[i]+"</b>"
            }
        }

        // for new line
        let newResponse2=newResponse.split("*").join("</br>")
        
        //for typign effect
        let newResponseArray= newResponse2.split(" ")
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i, nextWord+" ")
        }
        setLoading(false)
        setInput("")// putting empty string so input field will be empty string
    }

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default  ContextProvider
//to access context in our project we'll open main.jsx and remove react.strict mode and add contextprovider tag and wrap app between it