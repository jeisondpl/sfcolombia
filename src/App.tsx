import React, { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios, { AxiosError } from 'axios'

interface items {
  id: number
  images: {
    md: string
  }
}

interface data {
  endIndex: number
  firstPage: number
  lastPage: number
  length: number
  page: number
  size: number
  startIndex: number
  items: items[]
}

const App = () => {
  const [data, setData] = useState<items[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError>()
  const [input, setinput] = useState('')
  const [size, setSize] = useState(10)

  const page = useRef<number>(1)

  const getData = async (size: number, nextpage: number) => {
    setLoading(true)
    try {
      const dataAxios = await axios.get('https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes?size=99&page=2', {
        params: {
          size,
          page: nextpage,
        },
      })
      const data: data = dataAxios.data
      const { items } = data
      setData(items)
      page.current++
    } catch (error: any) {
      const err: AxiosError = error
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  //aqui se monta el componente
  useEffect(() => {
    getData(size, page.current)
  }, [])

  //changue page
  useEffect(() => {
    console.log(size, page.current)
    getData(size, page.current)
  }, [size])

  const handleNext = () => {
    getData(size, page.current)
  }

  const handleCPrev = () => {
    getData(size, page.current)
  }

  const handleNumberSize = () => {
    if (input) {
      setSize(parseInt(input))
      page.current = 1
    }
  }

  return (
    <div className='App'>
      <div>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <input type='text' placeholder='numero de registros' onChange={(e) => setinput(e.target.value)} value={input} />
      <p className='read-the-docs'>Numero registros :{size}</p>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className='card'>
        <button onClick={handleNumberSize}>Numero de registros</button>
        <button onClick={handleNext}>next page</button>
        <button onClick={handleCPrev}>prev page</button>
        {data &&
          data.map((item: items) => (
            <div key={item.id}>
              <img src={item.images.md} alt='hero' />
            </div>
          ))}
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
