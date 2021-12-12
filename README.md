# PR Dashboard

Please pull the repo and run the following commands:

`yarn`

then:

`yarn install-client`

and then:

`yarn serve`

This should install all packages for the server and the client and start the client app on localhost:3000.

I am making use of port 4000 for the express server, so if you have a process running on that port for some reason, you can change that in the `server.ts` file in the root of the project. There is a port variable on line 6.

I am making use of yarn as the package manager, so make sure that you have that installed by running `npm install --global yarn`.

This project is a MERN stack application making use of MongoDB, Express, React and Node. I have also used MaterialUI for the style framework.
