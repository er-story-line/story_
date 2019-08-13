import UUID from 'uuid'
import Emitter from 'emittery'
import store from 'src/store'
import { actionCreators } from 'src/reducers/line'

class LineRepo {
  constructor(postRepo) {
    this.postRepo = postRepo

    this.createIndexItem = this.createIndexItem.bind(this)
    this.createEmptyIndex = this.createEmptyIndex.bind(this)
    this.createNewLine = this.createNewLine.bind(this)
    this.add = this.add.bind(this)
    this.addIndex = this.addIndex.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
    this.updateMetadata = this.updateMetadata.bind(this)
    this.getMetadata = this.getMetadata.bind(this)
    this.getIndex = this.getIndex.bind(this)
    this.addPost = this.addPost.bind(this)
    this.addSavedPost = this.addSavedPost.bind(this)
    this.events = new Emitter()
  }

  createIndexItem(post, resource) {
    return {
      date: post.date,
      resource,
    }
  }

  createEmptyIndex() {
    return {
      raw: [],
    }
  }

  createNewLine(title, idxResource) {
    return {
      title,
      index: idxResource,
    }
  }

  add(title) {
    const mdId = UUID()
    const idxId = UUID()
    const mdResource = `${store.getState().line.root}metadata/${mdId}`
    const idxResource = `${store.getState().line.root}idx/${idxId}`

    const idx = this.createEmptyIndex()
    const line = this.createNewLine(title, idxResource)
    store.dispatch(
      actionCreators.createNewLine({
        idxResource,
        mdResource,
        idx,
        line,
      }),
    )
    return new Promise(res => res({
      idxResource,
      mdResource,
      idx,
      line,
    }))
  }

  addIndex(resource, index) {
    this.events.emit('index.add', { resource, index })
    store.dispatch(actionCreators.addIndex({ resource, index }))
    return new Promise(res => res(resource, index))
  }

  updateIndex(resource, index) {
    this.events.emit('index.update', { resource, index })
    store.dispatch(actionCreators.updateIndex({ resource, index }))
    return new Promise(res => res(resource, index))
  }

  updateMetadata(resource, line) {
    this.events.emit('line.update', { resource, line })
    store.dispatch(actionCreators.updateMetadata({ resource, line }))
    return new Promise(res => res(resource, line))
  }

  getMetadata(uri) {
    return store.getState().line.lines[uri]
  }

  getIndex(uri) {
    return store.getState().line.indices[uri]
  }

  async addPost(lineUri, post) {
    console.log('Saving post', { lineUri, post })
    if (!post || !post.content) {
      throw new Error('Nothing to save')
    }

    post.date = new Date()
    const { post: savedPost, resource } = await this.postRepo.add(post)
    await this.addSavedPost(savedPost, resource, lineUri)
  }

  async addSavedPost(post, resource, lineUri) {
    const metadata = await this.getMetadata(lineUri)

    if (!metadata) {
      throw new Error(`Unable to find metadata for '${lineUri}'`)
    }
    console.log('resource', resource)
    const { index } = metadata
    const { raw: indexItems } = await this.getIndex(index)
    const item = this.createIndexItem(post, resource)
    store.dispatch(actionCreators.updateIndex({ resource: index, index: item }))
    this.events.emit('post.add', {
      item,
      indexItems,
      post,
      resource,
    })
    return new Promise(res => res(indexItems, post))
  }
}

export default LineRepo
