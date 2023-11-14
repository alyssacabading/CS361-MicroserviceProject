# CS361 Movie Microservice

This mircoservice will return an array of streaming services hosting a given movie. 

## Requirements
- Node.js (at least version 18)
- Package: 'fs' for reading files. 

## Usage
• To REQUEST an array of streaming service hosting a movie, you must write
`Streaming services of: {insert movie name here}`
to `movie.txt`. For example: `Streaming services of: Django'.

• To RECEIVE an array of streaming services, the response will be on the `movie.txt`
file as an array. It is YOUR RESPONSIBILITY to decide how you will render the response
from the text file. 

• If there is error, the `movie.txt` will return an object containing and `error` element. 

## UML Sequence Diagram
<img width="616" alt="Screen Shot 2023-11-14 at 2 29 35 PM" src="https://github.com/alyssacabading/CS361-MicroserviceProject/assets/104327270/532c8451-7e5d-4e26-b33d-a84c715f41c7">
