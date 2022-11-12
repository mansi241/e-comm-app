import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppBar from '@mui/material/AppBar';
import {Toolbar, IconButton, Badge, Button} from '@mui/material'
import {Typography, Box} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getCartItemCount} from '../utils'
import {styled, alpha} from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';          //importing package what is required
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { fetchAllCategories } from '../feature/categories-slice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {useTheme} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const Search = styled("section")(({theme})=>({
    position:"relative",
    borderRadius: theme.shape.borderRadius,
    display:"flex",
    backgroundColor:alpha(theme.palette.common.white,0.15),
    "&:hover":{
        backgroundColor:alpha(theme.palette.common.white,0.25)
    },
    marginRight:theme.spacing(2),
    marginLeft:0,
    width:"100%"
}));

const StyleAutocomplete = styled(Autocomplete)(({theme})=>({
    color:"inherit",
    width:"100%",
    "& .MuiTextField-root":{
        paddingRight:`calc(1em + ${theme.spacing(4)})`
    },
    "& .MuiInputBase-input":{
        color:theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline":{
        border:"none"
    },
    "& .MuiSvgIcon-root":{
        fill:theme.palette.common.white,
    }
}));

const SearchIconWrapper = styled("section")(({theme})=>({
    padding: theme.spacing(0,2),
    height:"100%",
    position:"absolute",
    right:"0",
    pointerEvents : "none",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
}));

function SearchBar(){
    const theme = useTheme();
    const products = useSelector(state=>state.products?.value);
    const categories = useSelector(state=>state.categories?.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("searchterm");

    useEffect(()=>{
        setSelectedCategory(category ? category : "all")
    },[category])

    if(!categories.length) {
        dispatch(fetchAllCategories());
    }

    function handleCategoryChange(event) {
        const {value} = event.target
        navigate(value === "all" ? '/' : `/?category=${value}${searchTerm ? "&searchterm="+searchTerm : ""}`)
    }

    function handleSearchChange(searchText) {
        if(searchText) {
            navigate(selectedCategory == "all" ? `/?searchterm=${searchText}` : `/?category=${selectedCategory}&searchterm=${searchText}`)
        }else{
            navigate(selectedCategory === "all" ? '/' : `/?category=${selectedCategory}`)
        }
    }

    return (
    <Search>
        <Select size="small" 
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{
            m:1,
            textTransform:"capitalize",
            "&":{
                "::before":{
                    ":hover":{
                        border: "none"
                    },
                },
                "::before, &::after": {
                    border: "none",
                },
                ".MuiSelect-standard" : {
                    color:"common.white"
                },
                ".MuiSelect-iconStandard" : {
                    fill : theme.palette.common.white
                }
            }
        }} variant="standard" labelId='selected-category' id='selected-category-id'>
            <MenuItem sx={{
                textTransform:"capitalize",
            }} value="all">all</MenuItem>
            {
                categories?.map((category)=>(
                <MenuItem sx={{
                    textTransform:"capitalize",
                }} key={category} value={category}>
                    {category}
                </MenuItem>))
            }
        </Select>
        <StyleAutocomplete
            freeSolo
            id="selected-product"
            value = {selectedProduct}
            onChange={(e, value)=>{
                handleSearchChange(value.label)
            }}
            disablePortal
            options={Array.from(selectedCategory == "all" ? products : products.filter(prod=>prod.category==category),(prod)=>({id:prod.id, label:prod.title}))}
            renderInput={(params) => <TextField {...params} />}
            />
        <SearchIconWrapper>
            <SearchIcon></SearchIcon>
        </SearchIconWrapper>
    </Search>);
}

export default function Header() {
  const cartItems = useSelector(state=>state.cart?.value);
  const cartItemsCount = getCartItemCount(cartItems)

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant="h6" color="inherit" sx={{
                flexGrow:1
            }}>
                Ecomm
            </Typography>
            <SearchBar />
            <Box sx={{display : {md: "flex"}}}>
                <IconButton size="large" aria-label="shows cart item count" color="inherit">
                    <Badge badgeContent={cartItemsCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
  )
}
