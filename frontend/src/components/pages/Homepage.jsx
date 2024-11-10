import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import IntensityChart from "../visualisations/Intensity";
import LikelihoodChart from "../visualisations/Likelihood";
import RelevanceChart from "../visualisations/Relevance";
import YearChart from "../visualisations/Year";
import CityIndex from "../visualisations/City";
import CountryChart from "../visualisations/Country";
import TopicsBarChart from "../visualisations/Topics";
import axios from "axios";
import RegionChart from "../visualisations/Region";
const HomePage = () => {
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pest: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState({
    intensity: true,
    likelihood: true,
    relevance: true,
    year: true,
    region: true,
    country: true,
    city: true,
    topics: true,
  });
  const endYearOptions = [
    ...new Set(data.map((item) => item.end_year).filter(Boolean)),
  ];
  const sectorOptions = [
    ...new Set(data.map((item) => item.sector).filter(Boolean)),
  ];
  const topicOptions = [
    ...new Set(data.map((item) => item.topic).filter(Boolean)),
  ];
  const regionOptions = [
    ...new Set(data.map((item) => item.region).filter(Boolean)),
  ];
  const countryOptions = [
    ...new Set(data.map((item) => item.country).filter(Boolean)),
  ];
  const sourceOptions = [
    ...new Set(data.map((item) => item.source).filter(Boolean)),
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get('/api/v1/getdata', { params: filters });
        setData(response.data);
        
        
        setLoadingCharts({
          intensity: false,
          likelihood: false,
          relevance: false,
          year: false,
          region: false,
          country: false,
          city: false,
          topics: false,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [filters]);
  const handleFilterChange = async (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress sx={{ color: 'gray' }} />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4">Welcome to the Home Page</Typography>
      <Typography variant="body1">This is the main dashboard.</Typography>

      
      <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
     
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>End Year</InputLabel>
          <Select
            name="endYear"
            value={filters.endYear}
            onChange={handleFilterChange}
            label="End Year"
          >
            {endYearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

     
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Topic</InputLabel>
          <Select
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
            label="Topic"
          >
            {topicOptions.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

  
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Sector</InputLabel>
          <Select
            name="sector"
            value={filters.sector}
            onChange={handleFilterChange}
            label="Sector"
          >
            {sectorOptions.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

  
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Region</InputLabel>
          <Select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
            label="Region"
          >
            {regionOptions.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

   
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Source</InputLabel>
          <Select
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            label="Source"
          >
            {sourceOptions.map((source) => (
              <MenuItem key={source} value={source}>
                {source}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

    
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            label="Country"
          >
            {countryOptions.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mt={4}>
      {data.length > 0 ? (
        <Grid container spacing={4}>
          {[
            { title: "Intensity Visualization", Chart: IntensityChart, key: 'intensity' },
            { title: "Likelihood Visualization", Chart: LikelihoodChart, key: 'likelihood' },
            { title: "Relevance Visualization", Chart: RelevanceChart, key: 'relevance' },
            { title: "Year Chart", Chart: YearChart, key: 'year' },
            { title: "Region Chart", Chart: RegionChart, key: 'region' },
            { title: "Country Chart", Chart: CountryChart, key: 'country' },
            { title: "City Chart", Chart: CityIndex, key: 'city' },
            { title: "Topics Chart", Chart: TopicsBarChart, key: 'topics' },
          ].map(({ title, Chart, key }, index) => (
            <Grid item xs={12} sm={12} lg={6} key={index}>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  minHeight: "300px", 
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
                {loadingCharts[key] ? (
                  <CircularProgress sx={{ color: "gray" }} />
                ) : (
                  <Chart data={data} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No data available
        </Typography>
      )}
    </Box>

    </div>
  );
};

export default HomePage;
