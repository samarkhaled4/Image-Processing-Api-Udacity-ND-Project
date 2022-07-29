# Image-Processing-Api-Udacity-ND-Project
This is a simple image processing api

## Getting statrted
you can first download needed modules by run 
> `npm install`

##Main Page
Visit main api page by writing in browser
> `localhost:3000/` or `http://127.0.0.1:3000/` 

##Applying different requests as follows :
#####Get '/api'
> you will get response text of `api connectd`
#####Get '/api/images'
- you can get an original imae without resizing by 
- `http://127.0.0.1:3000/api/images?filename={imagename}`

- getting resized image with a width paramter only, will get auto value for height
  `http://127.0.0.1:3000/api/images?filename={imagename}&width={widthnum}`
  
- getting resized image with a height paramter only, will get auto value for width
 `http://127.0.0.1:3000/api/images?filename={imagename}&height={heightnum}`
 
- getting resized image with both width and height parameters
 `http://127.0.0.1:3000/api/images?filename={imagename}&width={widthnum}&height={heightnum}`

###succesed request will get status of `200`
###Bad  requested wii generate status code of `400`

###You test api by run `npm run test`
