import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import CardItems from './CardItems'
import { CircularProgress } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface Props {
  open: boolean
  idHero: number
  handleOpen: () => void
  handleClose: () => void
}

interface dataDetalil {
  id: number
  name: string
  images: {
    md: string
  }
  biography: {
    firstAppearance: string
    fullName: string
    publisher: string
  }
}

export default function BasicModal({ open, handleOpen, handleClose, idHero }: Props) {
  const [detail, setdetail] = useState<dataDetalil>()
  const [loading, setLoading] = useState<boolean>(false)

  const getDetail = async (id: number) => {
    setLoading(true)
    try {
      const dataAxios = await axios.get('https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/hero', {
        params: {
          id,
        },
      })
      const data: any = dataAxios.data
      setdetail(data)
    } catch (error: any) {
      const err: AxiosError = error
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetail(idHero)
  }, [idHero])

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          <h2>{detail?.biography.firstAppearance}</h2>
        </Typography>
      
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {loading && <CircularProgress color='success' />}
          {detail && <CardItems id={detail.id} image={detail.images.md} title={detail.name} handDetails={handleClose} titleButton={'Cerrar'} detail={detail?.biography.publisher} />}
        </div>
      </Box>
    </Modal>
  )
}
