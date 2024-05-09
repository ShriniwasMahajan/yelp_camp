# YelpCamp

> A Node.js web application project from the Udemy course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)

## Features

* Authentication:
  
  * User login with username and password

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos

  * Display campground location on Google Maps
  
  * Search existing campgrounds

* Flash messages responding to users' interaction with the app

* Responsive web design

### Custom Enhancements

* Update campground photos when editing campgrounds

* Improve image load time on the landing page using Cloudinary

* Use Helmet to strengthen security
 
## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/ShriniwasMahajan/yelp_camp.git
```

### Install dependencies

```sh
npm install
```

#### Create a cloudinary account to get an API key and secret code, then Create a .env file and add the following:

```
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_KEY=<your-cloud-key>
CLOUDINARY_SECRET=<your-cloud-secret>
MAPBOX_TOKEN=<your-mapbox-token>
DB_URL=<your-mongo-atlas-url>
SECRET=<random-number> (for encryption)
```
