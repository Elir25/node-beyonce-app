const { response } = require('express');
const express = require('express')

const app = express()

app.use(express.json())//allow us to acces the body

//middleware example --- not part of the exercise
app.use(function (request, response, next) {
  const start = new Date()
console.log('this is to explain what a middleware is')
next()
const end = new Date()
const duration = end - start;
console.log('the request took ...', duration)
})


const albumsData = [
    {
      albumId: "10",
      artistName: "Beyoncé",
      collectionName: "Lemonade",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
      releaseDate: "2016-04-25T07:00:00Z",
      primaryGenreName: "Pop",
      url:
        "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
      albumId: "11",
      artistName: "Beyoncé",
      collectionName: "Dangerously In Love",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
      releaseDate: "2003-06-24T07:00:00Z",
      primaryGenreName: "Pop",
      url:
        "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
  ];
  
  app.get("/albums", function (req, res) {
    res.send(albumsData);
  });

app.get('/albums/:albumId', function(req, res) {
  //get id from request path parms 
  const albumId = req.params.albumId
  //find the album thats equal to the id 
  const album = albumsData.find(item => item.albumId == albumId)
  //statement to check if the id exist 
  if(albumId) {
    res.send(album)
  } else {
    res.status(404).send()
  }

});

app.post('/albums', function(req, res) {
 
const body = req.body;
//get new album object
const newAlbum = {
    albumId: albumsData.length + 1,
    artistName: body.artistName,
    collectionName: body.collectionName,
    artworkUrl100: body.artworkUrl100,
    primaryGenreName: body.primaryGenreName,
    url: body.url,
  }
//add album object to the array
  albumsData.push(newAlbum);
  //return the  new album
  res.send(newAlbum);

  console.log(`The length of the array is: ${albumsData.length}`)

});

app.put("/albums", function (req, res) {

  res.send(albumsData);
});


app.delete("/albums/:id", function (req, res) {
//get the index of the album we want to remove with for
 for(let i = 0; i < albumsData.length; i ++) {
   if (albumsData[i].albumId == parseInt(req.params.id)) {
     albumsData.splice(i, 1)
   }
 }
  res.send();
});




app.listen(5000, () => console.log('the server has started'))