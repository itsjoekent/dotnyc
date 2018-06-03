const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentSchema = new Schema({
  alias: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

/**
 * Create or update content based on the alias.
 *
 * @param  {String} alias Content alias
 * @param  {String} text  Content text
 * @return {Promise<Content.null>} Promise with the newly updated or created Content.
 */
ContentSchema.statics.upsert = async function(alias, text) {
  const query = { alias };
  const update = { text };
  const options = { new: true, upsert: true };

  try {
    const result = await this.findOneAndUpdate(query, update, options);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Find content based on its alias.
 *
 * @param  {String} alias Content alias
 * @return {Promise<Content.null>} Promise with the content found
 */
ContentSchema.statics.findByAlias = async function(alias) {
  const query = { alias };

  try {
    const result = await this.findOne(query);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
