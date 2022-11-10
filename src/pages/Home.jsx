import React, { useEffect } from 'react'
import {useState} from 'react';
import {Container, Grid, Rating, useTheme, Card, IconButton, CardMedia,CardContent, Typography, CardActions, Button} from '@mui/material';
import ShoppingCartSharp from '@mui/icons-material/ShoppingCart';

export default function Home() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetchAllProducts();
  },[])

  async function fetchAllProducts() {
    const response = await fetch('https://fakestoreapi.com/products')
    const result = await response.json();
    setProducts(result);
  }
  
  return (
    // <div>
    //     <pre>{JSON.stringify(products, null, 2)}</pre>
    // </div>
    <Container sx={{py:8}} maxWidth="lg">
        <Grid container spacing={4}>
            {
                products.map(({title, id, price, description,rating, image})=>{
                    return <Grid item key={id} xs={12}  md={3} sm={6}>
                                    <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                                        <CardMedia
                                            sx={{alignSelf:'center', width:theme.spacing(30), height:theme.spacing(30), objectFit:'content', pt:theme.spacing()}}
                                            component="img"
                                            height="140"
                                            alt={{title}}
                                            image={image}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" 
                                            sx={{
                                                overflow:'hidden', 
                                                textOverflow:"ellipsis", 
                                                display:"-webkit-box", 
                                                "-webkit-line-clamp":"1",
                                                "-webkit-box-orient":"vertical"}}>
                                                {title}
                                            </Typography>
                                            <Typography paragraph color={theme.secondary}
                                             sx={{
                                                overflow:'hidden', 
                                                textOverflow:"ellipsis", 
                                                display:"-webkit-box", 
                                                "-webkit-line-clamp":"2",
                                                "-webkit-box-orient":"vertical"}}>
                                                {description}
                                            </Typography>
                                            <Typography fontSize="large" paragraph>
                                                {price}
                                            </Typography>
                                            <Rating readOnly precision={0.5} value={rating.rate}/>
                                        </CardContent>
                                        <CardActions sx={{alignSelf:'center'}}>
                                            <Button variant="contained">
                                                <ShoppingCartSharp/>
                                                Add to cart
                                            </Button>
                                        </CardActions>
                                    </Card>
                            </Grid>
                })
            }
            
        </Grid>
    </Container>
  )
}
