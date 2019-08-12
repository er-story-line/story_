import UUID from 'uuid'
import Emitter from 'emittery'
import store from 'src/store'
import { actionCreators } from 'src/reducers/posts'

class PostRepo {
  constructor() {
    this.root = 'https://story_.com/posts/'
    
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.get = this.get.bind(this)
    this.events = new Emitter()
  }

  add(post) {
    const uuid = UUID()
    const resource = `${this.root}${uuid}`
    const update = { post, resource }
    this.events.emit('post.add', update)
    store.dispatch(actionCreators.addPost(update))
    return new Promise(res => res(update))
  }

  update(resource, post) {
    this.events.emit('post.update', { post, resource })
    store.dispatch(actionCreators.addPost({ post, resource }))
    return new Promise(res => res(post, resource))
  }

  get(id) {
    return store.getState().posts.posts[id]
    // return new Promise(res => res(this.posts[id]))
  }
}

export default PostRepo
