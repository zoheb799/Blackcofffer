import DataModel from '../model/model.js';
export const PostData = async (req, res) => {
    try {
      const { 
        end_year, intensity, sector, topic, insight, url, region, start_year, 
        impact, added, published, country, relevance, pestle, source, title, likelihood 
      } = req.body;
  
      // Parse dates if they are provided and valid
      const parsedAdded = added && !isNaN(Date.parse(added)) ? new Date(added) : null;
      const parsedPublished = published && !isNaN(Date.parse(published)) ? new Date(published) : null;
  
      const data = new DataModel({
        end_year,
        intensity,
        sector,
        topic,
        insight,
        url,
        region,
        start_year,
        impact,
        added: parsedAdded,
        published: parsedPublished,
        country,
        relevance,
        pestle,
        source,
        title,
        likelihood
      });
  
      await data.save();
  
      res.status(201).json({
        success: true,
        message: "Data added successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || "Failed to add data",
      });
    }
  };

export const getData = async (req, res) => {
  try {
    const { end_year, sector, topic, region, country, pestle, source } = req.query;
    const query = {};

    if (end_year) query.end_year = end_year;
    if (sector) query.sector = sector;
    if (topic) query.topic = topic;
    if (region) query.region = region;
    if (country) query.country = country;
    if (pestle) query.pestle = pestle;
    if (source) query.source = source;

    const data = await DataModel.find(query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data from the database' });
  }
};
