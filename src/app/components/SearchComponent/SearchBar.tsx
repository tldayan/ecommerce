
"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from "./SearchBar.module.css"
import { Philosopher } from 'next/font/google'

const philosopher = Philosopher({
  subsets : ["latin"],
  weight : ["400"]
})


export default function SearchBar() {

  const searchResultsContainer = useRef<HTMLDivElement>(null)
  const [search,setSearch] = useState("")
  const [products,setProducts] = useState<product[]>([])
  const [filteredSearch, setFilteredSearch] = useState<product[]>([])

  useEffect(() => {

    const fetchAllProducts = async() => {

      const res = await fetch("https://ecomxpress.vercel.app/api/products")

      const allproducts = await res.json()

      setProducts(allproducts)

    }

    fetchAllProducts()
  },[])



  useEffect(() => {

    if(searchResultsContainer.current?.style.display === "none") {
      searchResultsContainer.current.style.display = "block"
    }

    if(!search.length) {
      setFilteredSearch([])
      return
    }

    const filteredSearchArray = products.filter(eachProduct => eachProduct.title.toLowerCase().includes(search.toLowerCase()))

    setFilteredSearch(filteredSearchArray)

  },[search,products])


  const closeSearchResults = () => {
    
    if (searchResultsContainer.current) {
      searchResultsContainer.current.style.display = "none";
    }

  }


  return (
    <>
    <div className={styles.SearchBar}>
      <input className={philosopher.className} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' />
      <Image
          src="/NavbarImages/search.png" 
          alt='Search'
          width={24}
          height={24}
          className='search_icon'
          
          />

      <div className={styles.mainSearchResultsContainer} ref={searchResultsContainer}>
       <ul className={styles.searchResultsContainer}>
        {filteredSearch.map(eachSearch => {
          return <li key={eachSearch.id}>
                  <Link onClick={() => closeSearchResults()} className={styles.result} href={`/pages/products/${eachSearch.id}`}><Image src={`${eachSearch.images[0]}`} width={100} height={100} alt={eachSearch.title} />{eachSearch.title}</Link>
                 </li>
        }) }
       </ul>
      </div>
    </div>
    </>
  )
}
