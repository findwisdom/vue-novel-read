module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const xuanhuan = new Schema({
        code: { type: Number  },
        order: { type: Number  },
        title: { type: String  },
        href: { type: String  }
    }, { versionKey: false });
    
    return mongoose.model('xuanhuan', xuanhuan);
}
