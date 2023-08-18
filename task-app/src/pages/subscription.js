import React, { useEffect, useState } from 'react';
import http from '../utils/Api';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  CardActions,
  CircularProgress,
} from '@mui/material';
import { AppAppBar } from '../view';
import withRoot from '../module/withRoot';
import jwt_decode from 'jwt-decode';

function SubscriptionsPage() {
  const token = localStorage.getItem('accessToken');
        let {id} = jwt_decode(token)


  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await http.get('/api/subscription/get-product', http.generateConfig(token));
      if (response) {
        setProducts(response.formulatedData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseClick = async (priceId) => {
    try {

      const userId = id;
      
      const response = await http.post(
        '/api/subscription/create-session',
        { userId, priceId },
        http.generateConfig(token)
      );
      // Handle the response as needed, e.g., redirect to Stripe checkout
      if (response) {
        // Redirect to Stripe checkout
        window.location.href = response.session.url;
      } else {
        console.error('Error creating session:', response.message);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <Container>
      <AppAppBar />
      <Typography variant="h4" component="h1" gutterBottom>
        Subscription Products
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {product.description}
                  </Typography>
                  <Typography variant="body2">
                    Price: ${product.priceItem.unit_amount / 100} USD
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePurchaseClick(product.priceItem.id)}
                  >
                    Purchase
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default withRoot(SubscriptionsPage);
