'use client'

import { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import { Box, Stack, Typography, Button, Modal, TextField,} from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0C0901',
  color: '#EEC13F',
  border: '2px solid #333A47',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  

  // Function to add items in inventory
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])
  
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

return (  
  
  <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={3}
    bgcolor='#1D1D27'
  >
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6"  component="h2">
          Add Item
        </Typography>
        <Stack width="100%" direction={'row'} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          
          <Button
            variant="outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            sx={{ color:'#FAFAF8', border: '#EEC13F'}}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="outlined" onClick={handleOpen} 
    sx={{ 
      border:'1px solid #EEC13F',
      color: '#EEC13F', }}>
      Add New Item
    </Button>
    <Box border={'1px solid #333'}>
      <Box
        width="820px"
        height="100px"
        bgcolor={'#E6B937'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Inventory ITEMS
        </Typography>
      </Box>
      <Stack width="820px" height="300px" spacing={2} overflow={'auto'}>
        {inventory.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="100px"
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            color="#EEC13F"
            bgcolor={'#0C0901'}
            paddingX={4}
          >
            <Typography variant={'h5'} color={'#FAFAF8'} textAlign={'center'}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant={'h5'} color={'#FAFAF8'} textAlign={'center'}>
              Quantity: {quantity}
              
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => addItem(name)}>
                 <IconButton color="primary" aria-label="quantity increase">
                   <AddIcon color="primary" />
                 </IconButton>
                </Button>

                <Button variant="outlined"  color="error" onClick={() => removeItem(name)}>
                 <IconButton color="primary" aria-label="quantity increase">
                   <RemoveIcon color="error" />
                 </IconButton>
                </Button>
            </Stack>
          </Box>
         
        ))}
      </Stack>
    </Box>
    </ThemeProvider>
  </Box>


)
} 