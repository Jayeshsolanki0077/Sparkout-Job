const mongoose = require ('mongoose');  

const Noteschema = mongoose.Schema ({      
    
    notes :{
        type:String,
        required: true                     
    }
});

module.exports = mongoose.model ('Notes', Noteschema);      