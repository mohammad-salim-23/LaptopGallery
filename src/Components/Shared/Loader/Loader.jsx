
const Loader = () => {
    return (
        <div className='flex justify-center h-[100vh] items-center'><PulseLoader
            color={'#2C3E50'}
            loading={true}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        /></div>
    )
}

export default Loader
