import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface Props {
  id: number
  image: string
  title?: string
  handDetails: (e: number) => void
  titleButton?: string
  detail?: string
}

export default function MediaCard({ id, title, image, handDetails, titleButton = 'Ver', detail }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='500' image={image} alt='green iguana' />
      <CardContent>
        <Typography gutterBottom variant='h4' component='div'>
          {title}
        </Typography>
        <Typography gutterBottom variant='h6' component='div'>
          {detail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handDetails(id)} size='small'>
          {titleButton}
        </Button>
      </CardActions>
    </Card>
  )
}
