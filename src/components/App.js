import React, {useState, useEffect} from "react"
import "../App.css"
import Nav from "./Nav"
import Library from "./Library"
import SearchResults from "./SearchResults"
import useLocalStorage from "../hooks/useLocalStorage"
import {Routes, Route, useNavigate} from "react-router-dom"





export default function App(){
    const [query, setQuery] = useState("")
    const [search, setSearch] = useLocalStorage("search", "")
    const [bookSearch, setBookSearch] = useLocalStorage("results",[])
    const [bookLibrary, setBookLibrary] = useLocalStorage("library",[])
    const [bookRead, setBookRead] = useLocalStorage("read",[])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
   
   

    let url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBTm3nxpXVcbzjgCRH-uoImiVKa951GZ9U`

    useEffect(()=>{
        const searchBooks = ()=>{
            try{
            
                setIsLoading(true)
                 fetch(url)
                     .then(res => res.json())
                     .then(data => setBookSearch(data?.items || []))
                 
                setIsLoading(false)     
             
             
            }catch(err){
            console.log(err)
            }
        }
      
      searchBooks()
      
        

    },[search])

    // useEffect(()=>{
    //     let readLibrary = library.map(book =>{
    //       return {
    //         ...book,
    //         isRead:false
    //       }
    //     })
    //     setBookRead(readLibrary)
    //     console.log(bookRead)
    //   },[bookLibrary])
    
   
   let handleSubmit = (e)=>{
        e.preventDefault()
        setSearch(query)
        navigate("/results")
        setQuery("")
    
   }
  

  return(
      <>
        <Nav setQuery = {setQuery} query={query} submit ={handleSubmit} />
        <Routes>
            <Route  
                exact path="/" 
                element={<Library 
                    read ={bookRead} 
                    setRead={setBookRead} 
                    setLibrary= {setBookLibrary}
                    library={bookLibrary}/>}
                />
               
            <Route  
                path="/results" 
                element={isLoading ? "Loading" :<SearchResults 
                    query={search} 
                    bookSearch={bookSearch} 
                    setLibrary={setBookLibrary} 
                    library={bookLibrary}
                    
                    />} 
                />
             
           
        </Routes>
        
        
      </>
  )
}