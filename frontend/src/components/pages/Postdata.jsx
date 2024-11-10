import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Grid } from '@mui/material';

const PostDataPage = () => {
  const [formData, setFormData] = useState({
    end_year: '',
    intensity: '',
    sector: '',
    topic: '',
    insight: '',
    url: '',
    region: '',
    start_year: '',
    impact: '',
    added: '',
    published: '',
    country: '',
    relevance: '',
    pestle: '',
    source: '',
    title: '',
    likelihood: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form data being submitted:", formData);
  
    try {
      const response = await axios.post('api/v1/postdata', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setFormData({ 
        end_year: '',
        intensity: '',
        sector: '',
        topic: '',
        insight: '',
        url: '',
        region: '',
        start_year: '',
        impact: '',
        added: '',
        published: '',
        country: '',
        relevance: '',
        pestle: '',
        source: '',
        title: '',
        likelihood: ''
      });
    } catch (error) {
      console.error('Error posting data:', error.response?.data || error.message);
      alert(`Failed to post data: ${error.response?.data?.message || error.message}`);
    }
  };
  return (
    <div>
      <Typography variant="h4" gutterBottom>Post Data</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Row 1 */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="End Year"
              name="end_year"
              margin="normal"
              variant="outlined"
              value={formData.end_year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Intensity"
              name="intensity"
              margin="normal"
              variant="outlined"
              type='number'
              value={formData.intensity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Sector"
              name="sector"
              margin="normal"
              variant="outlined"
              value={formData.sector}
              onChange={handleChange}
            />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Topic"
              name="topic"
              margin="normal"
              variant="outlined"
              value={formData.topic}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Insight"
              name="insight"
              margin="normal"
              variant="outlined"
              value={formData.insight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="URL"
              name="url"
              margin="normal"
              variant="outlined"
              value={formData.url}
              onChange={handleChange}
            />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Region"
              name="region"
              margin="normal"
              variant="outlined"
              value={formData.region}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Start Year"
              name="start_year"
              margin="normal"
              variant="outlined"
              value={formData.start_year}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Impact"
              name="impact"
              margin="normal"
              variant="outlined"
              value={formData.impact}
              onChange={handleChange}
            />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Added"
              name="added"
              margin="normal"
              variant="outlined"
              value={formData.added}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Published"
              name="published"
              margin="normal"
              variant="outlined"
              value={formData.published}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              margin="normal"
              variant="outlined"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>

          {/* Row 5 */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Relevance"
              name="relevance"
              margin="normal"
              type='number'
              variant="outlined"
              value={formData.relevance}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Pestle</InputLabel>
              <Select
                label="Pestle"
                name="pestle"
                value={formData.pestle}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Select Pestle</MenuItem>
                <MenuItem value="Technological">Technological</MenuItem>
                <MenuItem value="Economic">Economic</MenuItem>
                <MenuItem value="Political">Political</MenuItem>
                <MenuItem value="Environmental">Environmental</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Legal">Legal</MenuItem>
              </Select>
              <FormHelperText>Choose a pestle category</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Source"
              name="source"
              margin="normal"
              variant="outlined"
              value={formData.source}
              onChange={handleChange}
            />
          </Grid>

          {/* Row 6 */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              margin="normal"
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Likelihood"
              name="likelihood"
              margin="normal"
              type='number'
              variant="outlined"
              value={formData.likelihood}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostDataPage;
