import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Link, Divider, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import OpenAI from 'openai';
import { toast } from "react-toastify";

import http from '../utils/Api';
const newsBoxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
};

const News = () => {
    toast.configure();

    const [news, setNews] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [summary, setSummary] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
  
    useEffect(() => {
      fetchNews();
    }, []);
  
    const showToast = (message, type = "success") => {
        toast[type](message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
    const fetchNews = async () => {
      try {
        const apiKey = 'E0CClZDL2xb4vE7Wi3ZUY6zdjTs9yNGG';
        const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=world&api-key=${apiKey}`);
  
        if (response && response.data && response.data.response.docs) {
          setNews(response.data.response.docs.slice(0, 20));
        }
      } catch (error) {
        showToast(error, "error");

        console.error('Error fetching news:', error);
      }
    };
  

    const handleSummarizeClick = async (article) => {
      setSelectedArticle(article);
      setDialogOpen(true);
  
      const apiKey = process.env.OPENAI_API_KEY ||'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';
      const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});
      const articl = article.abstract;
      try {
        
        const prompt = `Summarize the following article:${articl}`;
        const response = await openai.completions.create({
          model: 'gpt-3.5-turbo-0613',
          prompt,
          max_tokens: 50,
        });
        if (response && response.choices) {
          setSummary(response.choices[0].text);
        }
      } catch (error) {
        
        console.error('Error summarizing article:', error);
      }
    };
  
    const handleCloseDialog = () => {
      setDialogOpen(false);
      setSelectedArticle(null);
      setSummary('');
    };
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Latest News
      </Typography>
      <div style={{ ...newsBoxStyle, padding: '20px' }}>
        <Grid container spacing={2}>
          {news.map((article) => (
            <Grid item xs={12} md={6} key={article._id}>
              <Card style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    <Link href={article.web_url} target="_blank" rel="noopener noreferrer">
                      {article.headline.main}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.source} | {new Date(article.pub_date).toLocaleString()}
                  </Typography>
                  <Divider />
                  <Typography variant="body1">
                    {article.abstract}
                  </Typography>
                  {article.multimedia && article.multimedia.length > 0 && (
                    <CardMedia
                      component="img"
                      alt="Article Image"
                      height="140"
                      image={`https://www.nytimes.com/${article.multimedia[0].url}`}
                    />
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleSummarizeClick(article)}
                    style={{ marginTop: '10px' }}
                  >
                    Summarize
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Summarized Text</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {summary}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default News;
