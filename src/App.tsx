import { useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'
import NavBar from './components/NavBar'
import { Button, ButtonGroup, CircularProgress, Grid } from '@mui/material'
import CardItems from './components/CardItems'
import ModalDetalles from './components/ModalDetalles'

interface items {
  id: number
  images: {
    md: string
  }
  name: string
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
  const [dataPage, setDataPage] = useState<data>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError>()
  const [input, setinput] = useState('')
  const [size, setSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [hero, setHero] = useState<number>()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setHero(undefined)
  }

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
      console.log(data)
      setDataPage(data)
      const { items } = data
      setData(items)
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
    page.current++
  }

  const handleCPrev = () => {
    getData(size, page.current)
    page.current--
  }

  const handleNumberSize = (e: any) => {
    e.preventDefault()
    if (input) {
      setSize(parseInt(input))
      page.current = 1
      setinput('')
    }
  }
  const handleInput = (e: string) => {
    setinput(e)
  }

  const handDetail = (id: number) => {
    setHero(id)
    handleOpen()
  }

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <NavBar onSearch={handleInput} handleClick={handleNumberSize} />
        <h1 className='read-the-docs'>Numero registros :{size}</h1>
        {loading && <CircularProgress color='success' />}
        {error && <div>Error: {error.message}</div>}
        <h1>Page:{page.current}</h1>
        <ButtonGroup variant='contained' aria-label='outlined primary button group'>
          <Button onClick={handleCPrev}>prev page</Button>
          <Button onClick={handleNext}>next page</Button>
        </ButtonGroup>
      </Grid>
      {data &&
        data.map((hero: items) => (
          <Grid item md={2} xs={6} rowSpacing={3}>
            <CardItems id={hero.id} image={hero.images.md} title={hero.name} handDetails={handDetail} />
          </Grid>
        ))}
      {hero && <ModalDetalles handleOpen={handleOpen} handleClose={handleClose} open={open} idHero={hero} />}
    </Grid>
  )
}

export default App
