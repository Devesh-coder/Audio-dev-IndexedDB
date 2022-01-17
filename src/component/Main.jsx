import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Dexie from 'dexie'
import Header from './Header'
import FileSelect from './FileSelect'
import Posts from './Posts'

const Main = () => {
	const db = new Dexie('ReactDexie')
	db.version(1).stores({
		posts: 'title, file',
	})
	db.open().catch((err) => {
		console.log(err.stack || err)
	})

	const [postFile, setFile] = useState('')
	const [posts, setPosts] = useState('')

	const getFile = (e) => {
		console.log(e)
		let reader = new FileReader()
		reader.readAsDataURL(e[0])
		reader.onload = (e) => {
			setFile(reader.result)
		}
	}

	const deletePost = async (id) => {
		console.log(id)
		db.posts.delete(id)
		let allPosts = await db.posts.toArray()
		setPosts(allPosts)
	}

	const getPostInfo = (e) => {
		e.preventDefault()
		if (posts.length < 4) {
			if (postFile !== '') {
				let post = {
					title: uuidv4(),
					file: postFile,
				}

				db.posts.add(post).then(async () => {
					let allPosts = await db.posts.toArray()
					setPosts(allPosts)
				})
			}
		} else {
			console.log('You are allowed to load 4 files at a time')
		}
	}

	useEffect(() => {
		const getPosts = async () => {
			let allPosts = await db.posts.toArray()
			setPosts(allPosts)
		}
		getPosts()
	}, [])

	let postData
	const data = (handleData) => {
		postData = handleData
	}
	console.log(postData)

	return (
		<>
			<Header />
			<FileSelect postInfo={getPostInfo} fileRead={getFile} />
			<Posts posts={posts} handleDelete={deletePost} givePost={data} />

			{postData}
		</>
	)
}

export default Main
