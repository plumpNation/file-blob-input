const uploader = document.getElementById('uploader');

const addImageToPage = (event) => {
  const image = new Image();

  // you can send this to the server as an ajax request if you want
  // but remember to throttle the requests to a decided maximum open requests.
  // make a little queue or something https://medium.com/@karenmarkosyan/how-to-manage-promises-into-dynamic-queue-with-vanilla-javascript-9d0d1f8d4df5
  image.src = event.srcElement.result;

  document.body.appendChild(image);
};

uploader.addEventListener('change', (event) => {
   console.log(event.target.files);

   Array.from(event.target.files).forEach(file => {
    const fileReader = new FileReader();

    // check the file is a jpg
    if (file.type !== 'image/jpeg') {
      return;
    }

    fileReader.addEventListener('loadend', addImageToPage);

    fileReader.addEventListener('error', (event) => {
      console.error(event);
    });

    // this is async (loading from file system), and will fire the events registered above.
    fileReader.readAsDataURL(file);
   });
});