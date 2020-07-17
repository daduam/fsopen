const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

// computes total likes of a list of blogs
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

// blog with most likes from a list of blogs
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxLikes)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

// author with the most blogs in a list of blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const result = _.countBy(blogs, 'author')
  const most = Math.max(...Object.values(result))
  const author = Object.keys(result).find(author => result[author] === most)
  return {
    author: author,
    blogs: most
  }
}

// author with the most likes across blogs
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const authors = blogs.reduce((result, blog) => {
    result[blog.author] = result[blog.author] === undefined
      ? blog.likes
      : result[blog.author] + blog.likes
    return result
  }, {})
  const most = Math.max(...Object.values(authors))
  const author = Object.keys(authors).find(author => authors[author] === most)
  return {
    author: author,
    likes: most
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
