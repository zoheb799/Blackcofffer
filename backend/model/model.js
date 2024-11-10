import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    end_year: { type: String, default: "" },               
    intensity: { type: Number, default: null },           
    sector: { type: String, default: ""  },              
    topic: { type: String, default: ""  },               
    insight: { type: String, default: "" },             
    url: { type: String, default: ""  },                 
    region: { type: String, default: ""  },              
    start_year: { type: String, default: "" },             
    impact: { type: String, default: "" },                 
    added: { type: Date, default: null },            
    published: { type: Date, default: null },        
    country: { type: String, default: ""  },             
    relevance: { type: Number, default: null },           
    pestle: { type: String, default: ""  },              
    source: { type: String, default: ""  },              
    title: { type: String, default: ""  },               
    likelihood: { type: Number, default: null },          
  });
  
  const DataModel = mongoose.model('Data', dataSchema);
  
  export default DataModel;
