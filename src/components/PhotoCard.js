function index({ photo }) {
  return (
    <div>
      <img alt={photo.data.author} src={photo.data.url} />
      <p>{photo.data.title}</p>
    </div>
  );
}

export default index;