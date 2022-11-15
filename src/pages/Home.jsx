import React, { useEffect } from 'react'
import {useState} from 'react';
import {Container, Grid, Rating, useTheme, Card, IconButton, CardMedia,CardContent, Typography, CardActions, Button} from '@mui/material';
import ShoppingCartSharp from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../feature/cart-slice';
import { fetchAllProducts } from '../feature/products-slice';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  const theme = useTheme();
  const state = useSelector(state=>state.products);
  const { value : products, loading} = state ?? {}
  const dispatch = useDispatch();     //gives access to dispatch function
  const [searchParams] = useSearchParams();    //read url params
  const searchTerm = searchParams.get("searchterm");
  const category = searchParams.get("category");

//   useEffect(()=>{
//     fetchAllProducts();
//   },[])

  if(!products?.length) {
    dispatch(fetchAllProducts());
  }

  function addProductToCart(product){
    //dispatch an action to add product to cart
    dispatch(addToCart({product, quantity:1}));
  }
  let filteredProducts = category && category != "all" ? products.filter((prod)=>prod.category==category) : products;

  filteredProducts = searchTerm ? filteredProducts.filter(prod=>prod.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredProducts;
  return (
    // <div>
    //     <pre>{JSON.stringify(products, null, 2)}</pre>
    // </div>
    //xs={12}  md={3} sm={6} -> for xs take 12 columns for each card

    <Container sx={{py:8}} maxWidth="lg">
        <Grid container spacing={4}>
            {
                filteredProducts?.map(({title, id, price, description,rating, image})=>{
                    return <Grid item key={id} xs={12}  md={3} sm={6}>   
                                    <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column', padding:theme.spacing(2,0) }}>
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
                                                WebkitLineClamp:"1",
                                                WebkitBoxOrient:"vertical"}}>
                                                {title}
                                            </Typography>
                                            <Typography paragraph color={theme.secondary}
                                             sx={{
                                                overflow:'hidden', 
                                                textOverflow:"ellipsis", 
                                                display:"-webkit-box", 
                                                WebkitLineClamp:"2",
                                                WebkitBoxOrient:"vertical"}}>
                                                {description}
                                            </Typography>
                                            <Typography fontSize="large" paragraph>
                                                {price}
                                            </Typography>
                                            <Rating readOnly precision={0.5} value={rating.rate}/>
                                        </CardContent>
                                        <CardActions sx={{alignSelf:'center'}}>
                                            <Button variant="contained" onClick={()=>addProductToCart({title, id, price, description,rating, image})}>
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
