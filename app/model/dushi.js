module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const dushi = new Schema({
        code: { type: Number  },
        order: { type: Number  },
        title: { type: String  },
        href: { type: String  }
    }, { versionKey: false });
    
    return mongoose.model('dushi', dushi);
}
