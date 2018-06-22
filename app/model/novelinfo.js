module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    
    const novelInfo = new Schema({
        title: { type: String  },
        author: { type: String  },
        code: { type: Number  },
        count: { type: String  },
        description: { type: String  },
        lastChapter: { type: String  },
        img: { type: String  },
        url: { type: String  },
        tag: { type: String  },
    }, { versionKey: false });
    
    return mongoose.model('novelInfo', novelInfo);
}
