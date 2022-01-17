import { FaRegFileAudio } from 'react-icons/fa'

function FileSelect({ postInfo, fileRead }) {
	return (
		<div className='container'>
			<div className='form'>
				<form onSubmit={postInfo}>
					<div className='control'>
						<label htmlFor='cover' className='label'>
							<FaRegFileAudio color='white' size={45} />
						</label>
						<input
							className='select'
							type='file'
							id='cover'
							name='file'
							onChange={(e) => fileRead(e.target.files)}
						/>
					</div>
					<button type='submit'>Add Audio</button>
				</form>
			</div>
		</div>
	)
}

export default FileSelect
