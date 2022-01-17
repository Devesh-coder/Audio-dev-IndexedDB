function Posts({ posts, handleDelete, givePost }) {
	let postData
	if (posts.length > 0) {
		postData = (
			<div className='post-container'>
				{posts.map((post) => {
					return (
						<div className='post' key={post.title}>
							<audio controls>
								<source src={post.file} />
							</audio>
							<button className='delete' onClick={() => handleDelete(post.title)}>
								Remove
							</button>
						</div>
					)
				})}
			</div>
		)
	} else if (posts == 0) {
		postData = (
			<div className='message'>
				<p>There are no audio files to show</p>
			</div>
		)
	}
	givePost(postData)
	return postData
}

export default Posts
