import Event from '../app/models/Event';

export default {
  add : async database => {
    const event = await Event.findOne({
      attributes: ['title','locale','description',],
      where: {
        
      },
    })
  }
}